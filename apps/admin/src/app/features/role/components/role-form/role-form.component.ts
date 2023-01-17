import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,    
    OnInit,
    Output,   
    Input, 
    Injectable
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { NAME_REGEX, ONLY_NUMBER_REGEX } from '@libera/constants';
import { RolePermission } from '@libera/models/catalog';
import { UserRole } from '@libera/models/user';
import { RolePermissionsService, UserRolesService } from '@libera/state';

import { FormBase } from '@mediomelon/ng-core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, skip, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ConfirmRoleDialog } from '../../dialogs/confirm-role-dialog/confirm-role.dialog';
import { CreateRoleDialog } from '../../dialogs/create-role-dialog/create-role.dialog';

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
}

export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}
  
  /**
   * The Json object for to-do list data.
   */
  let TREE_DATA: any = { };
  
  /**
   * Checklist database, it can build a tree structured Json object.
   * Each node in Json object represents a to-do item or a category.
   * If a node is a category, it has children items and new items can be added under the category.
   */
  @Injectable()
  export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  
    get data(): TodoItemNode[] {
      return this.dataChange.value;
    }
  
    constructor() {
      this.initialize();
    }
  
    initialize() {
      // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
      //     file node as children.
      const data = this.buildFileTree(TREE_DATA, 0);
  
      // Notify the change.
      this.dataChange.next(data);
    }
  
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
      return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new TodoItemNode();
        node.item = key;
  
        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.item = value;
          }
        }
  
        return accumulator.concat(node);
      }, []);
    }
  
    /** Add an item to to-do list */
    insertItem(parent: TodoItemNode, name: string) {
      if (parent.children) {
        parent.children.push({item: name} as TodoItemNode);
        this.dataChange.next(this.data);
      }
    }
  
    updateItem(node: TodoItemNode, name: string) {
      node.item = name;
      this.dataChange.next(this.data);
    }
  }

  @Component({
    selector: 'role-form',
    templateUrl: './role-form.component.html',
    styles: [`
        .mat-form-field {
            margin-right: 4px;
        }
    `],
    providers: [ChecklistDatabase],
    changeDetection: ChangeDetectionStrategy.OnPush,    
})

export class RoleFormComponent extends FormBase implements OnInit {
    @Output() cancel = new EventEmitter();

    @Input() permissions: Observable<RolePermission[]>;
    @Input() action: String;
    @Input() role: UserRole;

    timeout: number;

    permissionsSorted: Object = {};

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  
    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl: FlatTreeControl<TodoItemFlatNode>;
  
    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  
    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

    permissions$: Observable<RolePermission[]>;
  
    constructor(private _database: ChecklistDatabase,
                private formBuilder: FormBuilder,
                private storeService: RolePermissionsService,
                private translateService: TranslateService,
                private rolesStoreService: UserRolesService,
                private snackbar: MatSnackBar,
                private dialogRef: MatDialogRef<CreateRoleDialog>,
                private dialog: MatDialog,
          ) {
        super();
        this.form = formBuilder.group({
            description: [null, [Validators.required, Validators.maxLength(30), Validators.pattern(NAME_REGEX)]],
            acronym: [null, [Validators.required, Validators.maxLength(4), Validators.pattern(NAME_REGEX)]],
            appliesTo: [{value: null, disabled: true}],
            permissions: [null, Validators.required],
        });
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren,
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    
        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngOnInit() {
      this.flatNodeMap.clear();
      this.storeService.fetchAll('LIBERA_USER').subscribe(permissions => {
        this.permissions$ = from([permissions])
        const orderList = this.orderList(permissions)
        const listaSegments = [] 
        orderList.forEach(data => listaSegments.push(data.segment))
        orderList.forEach( ({ segment, description }) => {
            if(this.permissionsSorted[segment.description] === undefined) {
                        this.permissionsSorted[segment.description] = [description] 
                    }else{
                      this.permissionsSorted[segment.description] = [...this.permissionsSorted[segment.description], description]
                    }
        });
        TREE_DATA = this.permissionsSorted
        this._database.initialize();
        if (this.role) {
          const { description, acronym } = this.role;
          const appliesTo = this.translateService.instant('COMMON.USER_TYPES.'+ this.role.appliesTo)
          this.form.patchValue({ description, acronym, appliesTo }, { emitEvent: false });
          this.form.get('description').disable();
          this.rolesStoreService.getRoleByCode(this.role.code).subscribe( role => {
              if(role.permissions.length > 0){
                role.permissions.forEach( permission =>{
                  this.itemUserSelected(null, permission.description)
                })
              }
            }
          )
        }
      },
      error => {
        this.snackbar.open(
          this.translateService.instant(
              'COMMON.ERRORS.CONNECTION'
          ),
          'OK'
        );
      });
      this.form.get('description').valueChanges.pipe(
        tap(value => this.form.patchValue({description: value.replace(ONLY_NUMBER_REGEX,'')}, { emitEvent: false })),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap( value => 
            value
              ? this.rolesStoreService.getRoleByFilter('LIBERA_USER', 'DESCRIPTION', value).pipe(
                  map(rolesFound => rolesFound.filter(role => role.description.toLowerCase() === (this.form.get('description').value).toLowerCase())),
                  map(rolesFound => rolesFound.length),
                  catchError( err => {
                    this.snackbar.open(
                      this.translateService.instant(
                          'COMMON.ERRORS.CONNECTION'
                      ),
                      'OK'
                    );
                    return of(0)
                  })
                )
              : of(0)
        )
      ).subscribe( rolesFoundCount => {
        if(!this.form.get("description").getError("required") && !this.form.get("description").getError("pattern") && !this.form.get("description").getError("maxlength")){
          this.form.get('description').setErrors(null)
          if(rolesFoundCount > 0)
            this.form.get('description').setErrors({ invalid: true });
        }
      });

      this.form.get('acronym').valueChanges.pipe(
        tap(value => this.form.patchValue({acronym: value.replace(ONLY_NUMBER_REGEX,'')}, { emitEvent: false })),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap( value => 
          value 
            ? this.rolesStoreService.getRoleByFilter('LIBERA_USER', 'ACRONYM', value).pipe(
                map(rolesFound => rolesFound.filter(role => role.acronym === this.form.get('acronym').value)),
                map(rolesFound => rolesFound.length),
                catchError( err => {
                  this.snackbar.open(
                    this.translateService.instant(
                        'COMMON.ERRORS.CONNECTION'
                    ),
                    'OK'
                  );
                  return of(0);
                })
              )
          : of(0)
        )
      ).subscribe( rolesFoundCount => {
        if(!this.form.get("acronym").getError("required") && !this.form.get("acronym").getError("pattern") && !this.form.get("acronym").getError("maxlength")){
          this.form.get('acronym').setErrors(null)
          if(rolesFoundCount > 0 && (this.role ? this.form.get('acronym').value.toLowerCase() !== this.role.acronym.toLowerCase() : true))
              this.form.get('acronym').setErrors({ invalid: true });
        }
      });

    }

    orderList(list: RolePermission[]){
      list.sort((a,b) => {
        return (a.order - b.order)
      })
      list.sort((a,b) => {
        return (a.segment.order - b.segment.order)
      })
      return list
    }

    itemUserSelected(node?: TodoItemFlatNode, permission?: string): boolean{
      if(permission){
        let selected = false;
        [...this.flatNodeMap.keys()].forEach( node => {
          if(!selected){
            selected = node.item === permission && node.level === 1;
            if(selected){
              this.todoLeafItemSelectionToggle(node);
            }
          }
        })
      }
      return this.checklistSelection.isSelected(node);
    }

    submitData(){ 
      if(this.form.invalid) return;
      const roleCode = this.role ? this.role.code : '';
      const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { action: this.action, payload: this.form.getRawValue(), role: this.role }
        const dialogRef = this.dialog.open(ConfirmRoleDialog, dialogConfig);
        dialogRef.afterClosed().subscribe( (cancel) => { if(!cancel) this.closeDialog() } );
    }

    closeDialog(){
      this.dialogRef.close(true);
    }

    getLevel = (node: TodoItemFlatNode) => node.level;
  
    isExpandable = (node: TodoItemFlatNode) => node.expandable;
  
    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
  
    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  
    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
  
    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode =
        existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.expandable = !!node.children;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
    };
  
    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected =
        descendants.length > 0 &&
        descendants.every(child => {
          return this.checklistSelection.isSelected(child);
        });
      return descAllSelected;
    }
  
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
  
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);
      this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);
  
      // Force update for the parent
      descendants.forEach(child => this.checklistSelection.isSelected(child));
      this.checkAllParentsSelection(node);
      const nodeLevelOne = this.checklistSelection.selected.filter( node => node.level === 1);
      this.permissions$.pipe(
        map( permissions => {
          const permissionsSelected = permissions.filter(item => {
            const selected = nodeLevelOne.filter(node => item.description === node.item).length > 0;
            return selected;
          })
          const codes = permissionsSelected.map( item => item.code);
          this.form.get('permissions').patchValue(codes);
        })
      ).subscribe();
    }
  
    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
      this.checklistSelection.toggle(node);
      this.checkAllParentsSelection(node);
      const nodeLevelOne = this.checklistSelection.selected.filter( node => node.level === 1);
      this.permissions$.pipe(
        map( permissions => {
          const permissionsSelected = permissions.filter(item => {
            const selected = nodeLevelOne.filter(node => item.description === node.item).length > 0;
            return selected;
          })
          const codes = permissionsSelected.map( item => item.code);
          this.form.get('permissions').patchValue(codes);
        })
      ).subscribe();
    }
  
    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
      let parent: TodoItemFlatNode | null = this.getParentNode(node);
      while (parent) {
        this.checkRootNodeSelection(parent);
        parent = this.getParentNode(parent);
      }
    }
  
    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
      const nodeSelected = this.checklistSelection.isSelected(node);
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected =
        descendants.length > 0 &&
        descendants.every(child => {
          return this.checklistSelection.isSelected(child);
        });
      if (nodeSelected && !descAllSelected) {
        this.checklistSelection.deselect(node);
      } else if (!nodeSelected && descAllSelected) {
        this.checklistSelection.select(node);
      }
    }
  
    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
      const currentLevel = this.getLevel(node);
  
      if (currentLevel < 1) {
        return null;
      }
  
      const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
  
      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.treeControl.dataNodes[i];
  
        if (this.getLevel(currentNode) < currentLevel) {
          return currentNode;
        }
      }
      return null;
    }
  
    /** Select the category so we can insert the new item. */
    addNewItem(node: TodoItemFlatNode) {
      const parentNode = this.flatNodeMap.get(node);
      this._database.insertItem(parentNode!, '');
      this.treeControl.expand(node);
    }
  
    /** Save the node to database */
    saveNode(node: TodoItemFlatNode, itemValue: string) {
      const nestedNode = this.flatNodeMap.get(node);
      this._database.updateItem(nestedNode!, itemValue);
    }
}