/* eslint-disable no-undef */
import mobileEditor from './mobileEditor';

const components = [
    mobileEditor
];

const install = function (Vue) {
    if (install.installed) return;
    components.forEach(component => Vue.use(component));
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    mobileEditor
};
