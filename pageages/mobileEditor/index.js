import mobileEditor from './src/mobileEditor.vue';

mobileEditor.install = function (Vue) {
    Vue.component(mobileEditor.name, mobileEditor);
};

export default mobileEditor;