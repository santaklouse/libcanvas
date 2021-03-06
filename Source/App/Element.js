/*
---

name: "App.Element"

description: "LibCanvas.Layer"

license:
	- "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"
	- "[MIT License](http://opensource.org/licenses/mit-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas
	- App

provides: App.Element

...
*/

/** @class App.Element */
declare( 'LibCanvas.App.Element', {

	zIndex  : 0,
	renderer: null,
	settings: {},

	/** @constructs */
	initialize: function (layer, settings) {
		this.bindMethods([ 'redraw', 'destroy' ]);

		this.events = new Events(this);
		this.settings = new Settings({ hidden: false })
			.set(this.settings)
			.set(settings)
			.addEvents(this.events);
		layer.addElement( this );

		var ownShape = this.shape && this.shape != this.constructor.prototype.shape;

		if (ownShape || this.settings.get('shape')) {
			if (!ownShape) this.shape = this.settings.get('shape');
			this.saveCurrentBoundingShape();
		}
		if (this.settings.get('zIndex') != null) {
			this.zIndex = Number( this.settings.get('zIndex') );
		}

		this.configure();
	},

	configure: function () {
		return this;
	},

	previousBoundingShape: null,

	get currentBoundingShape () {
		return this.shape.getBoundingRectangle().fillToPixel();
	},

	destroy: function () {
		this.layer.rmElement( this );
		return this;
	},

	hasPoint: function (point) {
		return this.shape.hasPoint( point );
	},

	isTriggerPoint: function (point) {
		if (this.hasMousePoint) {
			return this.hasMousePoint(point);
		} else {
			return this.hasPoint(point);
		}
	},

	addShift: function (shift) {
		this.shape.move( shift );
		if (this.previousBoundingShape)
			this.previousBoundingShape.move( shift );
		return this;
	},

	isVisible: function () {
		return !this.settings.get('hidden');
	},

	redraw: function () {
		this.layer.redrawElement( this );
		return this;
	},

	onUpdate: function (time) {
		return this;
	},

	clearPrevious: function ( ctx ) {
		if (this.previousBoundingShape) ctx.clear( this.previousBoundingShape );
		return this;
	},

	saveCurrentBoundingShape: function () {
		var shape = this.currentBoundingShape;
		this.previousBoundingShape = shape.fillToPixel ?
			shape.clone().fillToPixel() : shape.clone().grow( 2 );
		return this;
	},

	renderToWrapper: function (ctx, resources) {
		this.renderTo(ctx, resources);
		return this;
	},

	renderTo: function (ctx, resources) {
		if (this.renderer) {
			this.renderer.renderTo(ctx, resources);
		}
		return this;
	}
});