import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, Output, ViewEncapsulation } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ComponentStore } from '@ngrx/component-store';
import { tap } from "rxjs/operators";

interface ChangeEvent {
    source: Event;
    checked: boolean;
}

export interface SlideToggleState {
    checked: boolean;
}

@Component({
    selector: 'mat-slide-toggle',
    templateUrl: './slide-toggle.component.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentStore],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule,
        MatRippleModule,
        AsyncPipe,
        NgIf
    ]
})
export class SlideToggleComponent {
    componentStore = inject(ComponentStore<SlideToggleState>);
    vm$ = this.componentStore.select(s => ({ checked: s.checked }));

    @Input() set checked(value: boolean) {
        this.setChecked(value);
    }

    @Output() change = this.componentStore.select(s => ({
        source: this,
        checked: s.checked
    }))

    constructor() {
        // set defaults
        this.componentStore.setState({
            checked: false,
        });
    }

    setChecked = this.componentStore.updater((state, checked: boolean) => ({ checked }));

    onChangeEvent = this.componentStore.effect<ChangeEvent>((event$) => {
        console.log(event$);
        return event$.pipe(
            tap(({ source, checked }) => {
                console.log('source, checked: ', source, checked)
                source.stopPropagation();
                this.setChecked(!checked);
            })
        )
    })
}