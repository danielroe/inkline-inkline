// Define setter-getter properties on the specified parent objects
//
// [ parentObject, setterGetterProperty ]
//
[
    [ window.navigator, 'userAgent' ],
    [ window.navigator, 'vendor' ],
    [ window, 'opera' ]
].forEach(([object, property]) => {
    Object.defineProperty(object, property, ((value) => ({
        get() { return value; },
        set(v) { value = v; }
    }))(object[property]));
});

jest.mock('popper.js', () => {
    const PopperJS = jest.requireActual('popper.js');

    return class {
        static placements = PopperJS.placements;

        constructor() {
            return {
                destroy: () => {},
                scheduleUpdate: () => {},
                popper: {
                    style: {}
                }
            };
        }
    };
});