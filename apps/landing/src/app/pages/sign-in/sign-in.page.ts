import { ChangeDetectionStrategy, Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SignInPayload } from '@libera/models/authentication';
import { AuthenticationQuery, AuthenticationStoreService } from '@libera/state';
import { TranslateService } from '@ngx-translate/core';
import { Hub } from 'aws-amplify';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage implements OnInit {
    isSubmitting$ = this.query.selectSigningIn();

    disconnection$ = this.route.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('disconnection'))
    );

    constructor(
        private query: AuthenticationQuery,
        private storeService: AuthenticationStoreService,
        private zone: NgZone,
        private snackbar: MatSnackBar,
        private translateService: TranslateService,
        private route: ActivatedRoute,
    ) {
        Hub.listen('auth', ({ payload: { event } }) => {
            if (event === 'cognitoHostedUI') {
                this.zone.run(() => {
                    this.storeService.validateFederatedSignIn(true).subscribe();
                });
            } else if (event === 'cognitoHostedUI_failure') {
                this.zone.run(() => this.storeService.validateFederatedSignIn(false));
            }
          });
    }

    ngOnInit() {
        this.disconnection$.pipe(
            tap( disconnection =>
                {
                    if(disconnection === 'session_expired' )
                    this.snackbar.open(
                        'Después de 10 minutos de inactividad hemos cerrado tu sesión por seguridad.',
                        'OK',
                        {   
                            duration: 0
                        }
                    );
                }
            )
        ).subscribe()
    }

    onSubmit(payload: SignInPayload) {
        this.storeService.signIn(payload).subscribe();
    }

    onFederatedSignIn() {
        this.storeService.signIn({email: '', password: '', isHostedUI: true}).subscribe();
    }

}
