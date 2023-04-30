export namespace main {
	
	export class Basic {
	    version: number;
	
	    static createFrom(source: any = {}) {
	        return new Basic(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.version = source["version"];
	    }
	}
	
	export class ShipStruct {
	    version: number;
	
	    static createFrom(source: any = {}) {
	        return new ShipStruct(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.version = source["version"];
	    }
	}

}

