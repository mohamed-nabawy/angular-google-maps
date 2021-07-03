import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';

let layerId = 0;

/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
@Directive({
    selector: 'agm-traffic-layer',
})
export class AgmTrafficLayer implements OnInit, OnDestroy{
    private _addedToManager = false;
    private _id: string = (layerId++).toString();

    /**
     * Hide/show transit layer
     */
    @Input() visible = true;

    constructor( private _manager: LayerManager ) {}

    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTrafficLayer(this);
        this._addedToManager = true;
    }

    /** @internal */
    id(): string { return this._id; }

    /** @internal */
    toString(): string { return `AgmTransitLayer-${this._id.toString()}`; }

    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }

}
