import { transition, trigger, style, query, group, animateChild, animate } from "@angular/animations";

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('ALL_TASKS_PAGE => TASK_FORM_PAGE', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('600ms ease-in-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('600ms ease-in-out', style({ left: '0%' }))
                ]),
            ]),
        ]),
        transition('TASK_FORM_PAGE => ALL_TASKS_PAGE', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ right: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('600ms ease-in-out', style({ right: '100%', opacity: 0 }))
                ]),
                query(':enter', [
                    animate('600ms ease-in-out', style({ right: '0%' }))
                ])
            ]),
        ])
    ]);