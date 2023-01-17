import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractPipe } from './extract.pipe';
import { FilterPipe } from './filter.pipe';
import { JoinPipe } from './join.pipe';
import { MapPipe } from './map.pipe';

const PIPES = [ExtractPipe, FilterPipe, JoinPipe, MapPipe];

@NgModule({
    declarations: PIPES,
    imports: [CommonModule],
    exports: PIPES,
})
export class FunctionalPipesModule {}
