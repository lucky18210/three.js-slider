/**
 * @author qiao / //github.com/qiao
 * @author mrdoob / //mrdoob.com
 * @author alteredq / //alteredqualia.com/
 * @author WestLangley / //github.com/WestLangley
 * @author erich666 / //erichaines.com
 */
THREE.OrbitControls = function(a, b) {
    function x() { return 2 * Math.PI / 60 / 60 * c.autoRotateSpeed }

    function y() { return Math.pow(.95, c.zoomSpeed) }

    function z(a) { k.theta -= a }

    function A(a) { k.phi -= a }

    function E(a) { c.object.isPerspectiveCamera ? l /= a : c.object.isOrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom * a)), c.object.updateProjectionMatrix(), n = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1) }

    function F(a) { c.object.isPerspectiveCamera ? l *= a : c.object.isOrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom / a)), c.object.updateProjectionMatrix(), n = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1) }

    function G(a) { o.set(a.clientX, a.clientY) }

    function H(a) { u.set(a.clientX, a.clientY) }

    function I(a) { r.set(a.clientX, a.clientY) }

    function J(a) {
        p.set(a.clientX, a.clientY), q.subVectors(p, o).multiplyScalar(c.rotateSpeed);
        var b = c.domElement === document ? c.domElement.body : c.domElement;
        z(2 * Math.PI * q.x / b.clientHeight), A(2 * Math.PI * q.y / b.clientHeight), o.copy(p), c.update()
    }

    function K(a) { v.set(a.clientX, a.clientY), w.subVectors(v, u), w.y > 0 ? E(y()) : w.y < 0 && F(y()), u.copy(v), c.update() }

    function L(a) { s.set(a.clientX, a.clientY), t.subVectors(s, r).multiplyScalar(c.panSpeed), D(t.x, t.y), r.copy(s), c.update() }

    function M(a) {}

    function N(a) { a.deltaY < 0 ? F(y()) : a.deltaY > 0 && E(y()), c.update() }

    function O(a) {
        var b = !1;
        switch (a.keyCode) {
            case c.keys.UP:
                D(0, c.keyPanSpeed), b = !0;
                break;
            case c.keys.BOTTOM:
                D(0, -c.keyPanSpeed), b = !0;
                break;
            case c.keys.LEFT:
                D(c.keyPanSpeed, 0), b = !0;
                break;
            case c.keys.RIGHT:
                D(-c.keyPanSpeed, 0), b = !0
        }
        b && (a.preventDefault(), c.update())
    }

    function P(a) { o.set(a.touches[0].pageX, a.touches[0].pageY) }

    function Q(a) {
        if (c.enableZoom) {
            var b = a.touches[0].pageX - a.touches[1].pageX,
                d = a.touches[0].pageY - a.touches[1].pageY,
                e = Math.sqrt(b * b + d * d);
            u.set(0, e)
        }
        if (c.enablePan) {
            var f = .5 * (a.touches[0].pageX + a.touches[1].pageX),
                g = .5 * (a.touches[0].pageY + a.touches[1].pageY);
            r.set(f, g)
        }
    }

    function R(a) {
        p.set(a.touches[0].pageX, a.touches[0].pageY), q.subVectors(p, o).multiplyScalar(c.rotateSpeed);
        var b = c.domElement === document ? c.domElement.body : c.domElement;
        z(2 * Math.PI * q.x / b.clientHeight), A(2 * Math.PI * q.y / b.clientHeight), o.copy(p), c.update()
    }

    function S(a) {
        if (c.enableZoom) {
            var b = a.touches[0].pageX - a.touches[1].pageX,
                d = a.touches[0].pageY - a.touches[1].pageY,
                e = Math.sqrt(b * b + d * d);
            v.set(0, e), w.set(0, Math.pow(v.y / u.y, c.zoomSpeed)), E(w.y), u.copy(v)
        }
        if (c.enablePan) {
            var f = .5 * (a.touches[0].pageX + a.touches[1].pageX),
                g = .5 * (a.touches[0].pageY + a.touches[1].pageY);
            s.set(f, g), t.subVectors(s, r).multiplyScalar(c.panSpeed), D(t.x, t.y), r.copy(s)
        }
        c.update()
    }

    function T(a) {}

    function U(a) {
        if (!1 !== c.enabled) {
            switch (a.preventDefault(), c.domElement.focus ? c.domElement.focus() : window.focus(), a.button) {
                case c.mouseButtons.LEFT:
                    if (a.ctrlKey || a.metaKey || a.shiftKey) {
                        if (!1 === c.enablePan) return;
                        I(a), h = g.PAN
                    } else {
                        if (!1 === c.enableRotate) return;
                        G(a), h = g.ROTATE
                    }
                    break;
                case c.mouseButtons.MIDDLE:
                    if (!1 === c.enableZoom) return;
                    H(a), h = g.DOLLY;
                    break;
                case c.mouseButtons.RIGHT:
                    if (!1 === c.enablePan) return;
                    I(a), h = g.PAN
            }
            h !== g.NONE && (document.addEventListener("mousemove", V, !1), document.addEventListener("mouseup", W, !1), c.dispatchEvent(e))
        }
    }

    function V(a) {
        if (!1 !== c.enabled) switch (a.preventDefault(), h) {
            case g.ROTATE:
                if (!1 === c.enableRotate) return;
                J(a);
                break;
            case g.DOLLY:
                if (!1 === c.enableZoom) return;
                K(a);
                break;
            case g.PAN:
                if (!1 === c.enablePan) return;
                L(a)
        }
    }

    function W(a) {!1 !== c.enabled && (M(a), document.removeEventListener("mousemove", V, !1), document.removeEventListener("mouseup", W, !1), c.dispatchEvent(f), h = g.NONE) }

    function X(a) {!1 === c.enabled || !1 === c.enableZoom || h !== g.NONE && h !== g.ROTATE || (a.preventDefault(), a.stopPropagation(), c.dispatchEvent(e), N(a), c.dispatchEvent(f)) }

    function Y(a) {!1 !== c.enabled && !1 !== c.enableKeys && !1 !== c.enablePan && O(a) }

    function Z(a) {
        if (!1 !== c.enabled) {
            switch (a.preventDefault(), a.touches.length) {
                case 1:
                    if (!1 === c.enableRotate) return;
                    P(a), h = g.TOUCH_ROTATE;
                    break;
                case 2:
                    if (!1 === c.enableZoom && !1 === c.enablePan) return;
                    Q(a), h = g.TOUCH_DOLLY_PAN;
                    break;
                default:
                    h = g.NONE
            }
            h !== g.NONE && c.dispatchEvent(e)
        }
    }

    function $(a) {
        if (!1 !== c.enabled) switch (a.preventDefault(), a.stopPropagation(), a.touches.length) {
            case 1:
                if (!1 === c.enableRotate) return;
                if (h !== g.TOUCH_ROTATE) return;
                R(a);
                break;
            case 2:
                if (!1 === c.enableZoom && !1 === c.enablePan) return;
                if (h !== g.TOUCH_DOLLY_PAN) return;
                S(a);
                break;
            default:
                h = g.NONE
        }
    }

    function _(a) {!1 !== c.enabled && (T(a), c.dispatchEvent(f), h = g.NONE) }

    function aa(a) {!1 !== c.enabled && a.preventDefault() }
    this.object = a, this.domElement = void 0 !== b ? b : document, this.enabled = !0, this.target = new THREE.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }, this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function() { return j.phi }, this.getAzimuthalAngle = function() { return j.theta }, this.saveState = function() { c.target0.copy(c.target), c.position0.copy(c.object.position), c.zoom0 = c.object.zoom }, this.reset = function() { c.target.copy(c.target0), c.object.position.copy(c.position0), c.object.zoom = c.zoom0, c.object.updateProjectionMatrix(), c.dispatchEvent(d), c.update(), h = g.NONE }, this.update = function() {
        var b = new THREE.Vector3,
            e = (new THREE.Quaternion).setFromUnitVectors(a.up, new THREE.Vector3(0, 1, 0)),
            f = e.clone().inverse(),
            o = new THREE.Vector3,
            p = new THREE.Quaternion;
        return function() { var q = c.object.position; return b.copy(q).sub(c.target), b.applyQuaternion(e), j.setFromVector3(b), c.autoRotate && h === g.NONE && z(x()), j.theta += k.theta, j.phi += k.phi, j.theta = Math.max(c.minAzimuthAngle, Math.min(c.maxAzimuthAngle, j.theta)), j.phi = Math.max(c.minPolarAngle, Math.min(c.maxPolarAngle, j.phi)), j.makeSafe(), j.radius *= l, j.radius = Math.max(c.minDistance, Math.min(c.maxDistance, j.radius)), c.target.add(m), b.setFromSpherical(j), b.applyQuaternion(f), q.copy(c.target).add(b), c.object.lookAt(c.target), !0 === c.enableDamping ? (k.theta *= 1 - c.dampingFactor, k.phi *= 1 - c.dampingFactor, m.multiplyScalar(1 - c.dampingFactor)) : (k.set(0, 0, 0), m.set(0, 0, 0)), l = 1, !!(n || o.distanceToSquared(c.object.position) > i || 8 * (1 - p.dot(c.object.quaternion)) > i) && (c.dispatchEvent(d), o.copy(c.object.position), p.copy(c.object.quaternion), n = !1, !0) }
    }(), this.dispose = function() { c.domElement.removeEventListener("contextmenu", aa, !1), c.domElement.removeEventListener("mousedown", U, !1), c.domElement.removeEventListener("wheel", X, !1), c.domElement.removeEventListener("touchstart", Z, !1), c.domElement.removeEventListener("touchend", _, !1), c.domElement.removeEventListener("touchmove", $, !1), document.removeEventListener("mousemove", V, !1), document.removeEventListener("mouseup", W, !1), window.removeEventListener("keydown", Y, !1) };
    var c = this,
        d = { type: "change" },
        e = { type: "start" },
        f = { type: "end" },
        g = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 },
        h = g.NONE,
        i = 1e-6,
        j = new THREE.Spherical,
        k = new THREE.Spherical,
        l = 1,
        m = new THREE.Vector3,
        n = !1,
        o = new THREE.Vector2,
        p = new THREE.Vector2,
        q = new THREE.Vector2,
        r = new THREE.Vector2,
        s = new THREE.Vector2,
        t = new THREE.Vector2,
        u = new THREE.Vector2,
        v = new THREE.Vector2,
        w = new THREE.Vector2,
        B = function() { var a = new THREE.Vector3; return function(c, d) { a.setFromMatrixColumn(d, 0), a.multiplyScalar(-c), m.add(a) } }(),
        C = function() { var a = new THREE.Vector3; return function(d, e) {!0 === c.screenSpacePanning ? a.setFromMatrixColumn(e, 1) : (a.setFromMatrixColumn(e, 0), a.crossVectors(c.object.up, a)), a.multiplyScalar(d), m.add(a) } }(),
        D = function() {
            var a = new THREE.Vector3;
            return function(d, e) {
                var f = c.domElement === document ? c.domElement.body : c.domElement;
                if (c.object.isPerspectiveCamera) {
                    var g = c.object.position;
                    a.copy(g).sub(c.target);
                    var h = a.length();
                    h *= Math.tan(c.object.fov / 2 * Math.PI / 180), B(2 * d * h / f.clientHeight, c.object.matrix), C(2 * e * h / f.clientHeight, c.object.matrix)
                } else c.object.isOrthographicCamera ? (B(d * (c.object.right - c.object.left) / c.object.zoom / f.clientWidth, c.object.matrix), C(e * (c.object.top - c.object.bottom) / c.object.zoom / f.clientHeight, c.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), c.enablePan = !1)
            }
        }();
    c.domElement.addEventListener("contextmenu", aa, !1), c.domElement.addEventListener("mousedown", U, !1), c.domElement.addEventListener("wheel", X, !1), c.domElement.addEventListener("touchstart", Z, !1), c.domElement.addEventListener("touchend", _, !1), c.domElement.addEventListener("touchmove", $, !1), window.addEventListener("keydown", Y, !1), this.update()
}, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, { center: { get: function() { return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target } }, noZoom: { get: function() { return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom }, set: function(a) { console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !a } }, noRotate: { get: function() { return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate }, set: function(a) { console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !a } }, noPan: { get: function() { return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan }, set: function(a) { console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !a } }, noKeys: { get: function() { return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys }, set: function(a) { console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !a } }, staticMoving: { get: function() { return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping }, set: function(a) { console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !a } }, dynamicDampingFactor: { get: function() { return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor }, set: function(a) { console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = a } } });

//==============================================
//==============================================
//==============================================
//==============================================



(function($) {
    "use strict";

    $(function() {


        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;


        // Generate one plane geometries mesh to scene
        //-------------------------------------	
        var camera,
            controls,
            scene,
            light,
            renderer,
            material,
            displacementSprite,
            theta = 0;



        var offsetWidth = 640,
            offsetHeight = 360,
            allImages = [],
            imgTotal,
            sliderImages = [],
            imagesLoaded = false;

        var uniformsTargetV = 400;

        // constants
        var WIDTH = offsetWidth,
            HEIGHT = offsetHeight,
            DENSITY = 3;

        var particles;
        var colors;

        var activeSlider = 0;



        init();
        render();



        function init() {
            //camera
            camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 10, 2500); // FlyCamera // FlyControls
            camera.movementSpeed = 100.0;
            camera.rollSpeed = 0.5;
            camera.position.y = 60;
            camera.position.z = 500;



            //Scene
            scene = new THREE.Scene();


            //HemisphereLight
            scene.add(new THREE.AmbientLight(0x555555));

            light = new THREE.SpotLight(0xffffff, 1.5);
            light.position.set(0, 0, 2000);
            scene.add(light);



            //WebGL Renderer	
            // create a render and set the size
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 1);

            //controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.autoRotate = false;
            controls.autoRotateSpeed = 0.5;
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.enableZoom = false;
            controls.target.set(0, 0, 0);
            controls.update();


            // add the output of the renderer to the html element
            document.body.appendChild(renderer.domElement);




            // Immediately use the texture for material creation
            // Create a texture loader so we can load our image file
            var imgs = [
                'https://placekitten.com/640/360',
                'https://placekitten.com/640/361',
                'https://placekitten.com/640/362'
            ];


            //A loader for loading all images from array.
            var loader = new THREE.TextureLoader();
            loader.crossOrigin = 'anonymous';


            imgs.forEach(function(img) {
                var image = loader.load(img);
                image.magFilter = image.minFilter = THREE.LinearFilter;
                image.anisotropy = renderer.capabilities.getMaxAnisotropy();
                sliderImages.push(image);
            });


            //Preload
            imgTotal = imgs.length;


            imgs.forEach(function(element, index) {
                loadImage(loader, element, index, offsetWidth, offsetHeight, imgTotal, sliderImages, $('#3D-gallery-three-canvas__loader'));
            });




            // Fires when the window changes
            window.addEventListener('resize', onWindowResize, false);


        }


        //Fire the slider transtion with buttons
        var isAnimating = false;
        var $btn = $('#pagination > a');



        $btn.on('click', function(e) {
            e.preventDefault();

            if (!isAnimating) {
                isAnimating = true;

                var slideCurId = $('#pagination > a.active').index();

                $btn.removeClass('active');
                $(this).addClass('active');

                var slideNextId = $(this).index();


                console.log('Current: ' + slideCurId + ' | Next: ' + slideNextId);

                //next object		
                activeSlider = slideNextId;

                //current object



                //reset button status
                isAnimating = false;



            }

        });



        function render() {
            requestAnimationFrame(render);

            theta += 0.1;


            //To set a background color.
            //renderer.setClearColor( 0x000000 );	



            //Display the destination object
            if (typeof allImages[activeSlider] != typeof undefined) {

                for (var i = 0; i < allImages[activeSlider].geometry.vertices.length; i++) {
                    var particle = allImages[activeSlider].geometry.vertices[i];
                    var speed = Math.random() * .05;;

                    particle.x += (particle.origPos.x - particle.x) * speed;
                    particle.y += (particle.origPos.y - particle.y) * speed;
                    particle.z += (particle.origPos.z - particle.z) * speed;


                }

            }

            //Hide inactive objects
            allImages.forEach(function(element, index) {
                if (index != activeSlider) {

                    for (var i = 0; i < element.geometry.vertices.length; i++) {
                        var particle = element.geometry.vertices[i];
                        var speed = Math.random() * .05;


                        particle.x += (particle.targetPos.x - particle.x) * speed;
                        particle.y += (particle.targetPos.y - particle.y) * speed;
                        particle.z += (particle.targetPos.z - particle.z) * speed;


                    }
                }

            });



            //Animating Three.js vertices
            allImages.forEach(function(element, index) {
                element.geometry.verticesNeedUpdate = true;
            });


            //check all images loaded
            if (typeof allImages != typeof undefined) {
                if (!imagesLoaded && allImages.length === imgTotal) {
                    allImages.forEach(function(element, index) {
                        scene.add(element);
                        console.log(element);
                    });
                    imagesLoaded = true;


                }

            }



            //update camera and controls
            controls.update();

            renderer.render(scene, camera);


        }


        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }


        /*
         * Load Image
         *
         * @param  {Object} imgLoader       - A loader for loading all images from array.
         * @param  {String} src             - URL of image.
         * @param  {Number} index           - Index of image.
         * @param  {Number} w               - The width of an image, in pixels. 
         * @param  {Number} h               - The height of an image, in pixels. 
         * @param  {Number} total           - Total number of preload images.
         * @param  {Array} sliderImages     - Images for implementing loaders.
         * @param  {Object} loading         - Progress bar display control.
         * @return {Void}
         */
        function loadImage(imgLoader, src, index, w, h, total, sliderImages, loading) {

            var imgW = w,
                imgH = h;



            // load a resource
            imgLoader.load(
                // resource URL
                src,

                // onLoad callback
                function(texture) {
                    // in this example we create the material when the texture is loaded

                    // now set up the particle material
                    material = new THREE.PointsMaterial({
                        map: texture,
                        size: DENSITY * 1.5,
                        vertexColors: true,
                        sizeAttenuation: true
                    });

                    var geometry = new THREE.Geometry();
                    var pixels = getImageData(texture.image);
                    var step = DENSITY * 4;
                    var x = 0,
                        y = 0;

                    geometry.center();

                    // go through the image pixels
                    for (x = 0; x < WIDTH * 4; x += step) {
                        for (y = HEIGHT; y >= 0; y -= DENSITY) {
                            var p = ((y * WIDTH * 4) + x);

                            // grab the actual data from the
                            // pixel, ignoring any transparent ones
                            if (pixels.data[p + 3] > 0) {
                                var color = new THREE.Color();
                                var vector = new THREE.Vector3(-300 + x / 4, 240 - y, 0);
                                var saturationDiff = 100; // Used to adjust the saturation, the maximum value is 255 

                                color.setRGB(pixels.data[p] / saturationDiff, pixels.data[p + 1] / saturationDiff, pixels.data[p + 2] / saturationDiff);

                                // push on the particle
                                geometry.vertices.push(vector);
                                geometry.colors.push(color);
                            }
                        }
                    }

                    // now create a new system
                    displacementSprite = new THREE.Points(geometry, material);
                    displacementSprite.sortParticles = true;

                    // grab a couple of cacheable vals
                    particles = displacementSprite.geometry.vertices;
                    colors = displacementSprite.geometry.colors;

                    // add some additional vars to the
                    // particles to ensure we can do physics
                    // and so on
                    for (var i = 0; i < particles.length; i++) {
                        var particle = particles[i];
                        particle.origPos = {
                            x: particle.x,
                            y: particle.y,
                            z: particle.z
                        };

                        //hide all
                        var newPosX = 4000 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
                        var newPosY = 2000 * Math.random();
                        var newPosZ = 3000 * Math.random();
                        particle.x = newPosX;
                        particle.y = newPosY;
                        particle.z = newPosZ;

                        particle.targetPos = {
                            x: newPosX,
                            y: newPosY,
                            z: newPosZ
                        };




                    }


                    // gc and add
                    pixels = null;
                    allImages.push(displacementSprite);




                    //loading
                    TweenMax.to(loading, 0.5, {
                        width: Math.round(100 * allImages.length / total) + '%',
                        onComplete: function() {

                            if ($(this.target).width() >= windowWidth - 50) {

                                TweenMax.to(this.target, 0.5, {
                                    alpha: 0
                                });
                            }

                        }
                    });

                },

                // onProgress callback currently not supported
                undefined,

                // onError callback
                function(err) {
                    console.error('An error happened.');
                }
            );

        }


        /*
         * Get Image Data when Draw Image To Canvas
         *
         * @param  {Object} image         - Overridden with a record type holding data, width and height.
         * @return {JSON}                 - The image data.
         */
        function getImageData(image) {

            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);

            return ctx.getImageData(0, 0, image.width, image.height);
        }




    });


})(jQuery);