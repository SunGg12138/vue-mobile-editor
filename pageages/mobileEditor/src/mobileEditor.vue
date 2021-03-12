<template>
    <div>
        <div class="editor">
            <div ref="toolbar" class="toolbar"></div>
            <div style="margin-left: 95px;">
                <div style="margin: 0 auto;" :style="{ width: view_size.width + 'px', height: view_size.height + 'px' }">
                    <div class="view" :style="view_style">
                        <div v-if="showViewHead" class="view-head" v-text="viewHeadText" :style="view_head_style"></div>
                        <div class="content" :style="contentStyle">
                            <div style="margin-bottom: 8px;"><slot name="content-head"></slot></div>
                            <div ref="text" style="height: 500px;"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 10px;">
                    <select @change="changeMobileType">
                        <option v-for="(item, index) in mobile_types" :key="index" :value="index" v-text="item.name"></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor';
import MOBILE_TYPES from '../config/MOBILE_TYPES';
export default {
    name: 'MobileEditor',

    data () {
        return {
            // 机型
            mobile_types: [],
            mobile_type_index: 0,
            
            // 自动缩放比例
            scale: 0.75
        };
    },

    props: {
        value: {
            type: String,
            default: '',
        },
        base64Img: {
            type: Boolean,
            default: true,
        },
        customUploadImg: {
            type: Function,
            default: null,
        },
        placeholder: {
            type: String,
            default: '请输入内容...',
        },
        viewStyle: {
            type: Object,
            default: function() {
                return {};
            }
        },
        viewHeadText: {
            type: String,
            default: '文章详情',
        },
        viewHeadStyle: {
            type: Object,
            default: function() {
                return {};
            }
        },
        showViewHead: {
            type: Boolean,
            default: true,
        },
        contentStyle: {
            type: Object,
            default: function() {
                return {};
            }
        },
        mobileTypes: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    
    computed: {
        view_style () {
            const type = this.mobile_types[this.mobile_type_index];
            if (type && type.style) return Object.assign({}, this.viewStyle, type.style);
            return this.viewStyle;
        },
        view_head_style () {
            const type = this.mobile_types[this.mobile_type_index];
            if (type && type.style) return Object.assign({}, this.viewHeadStyle, type.head_style);
            return this.viewHeadStyle;
        },
        view_size () {
            const type = this.mobile_types[this.mobile_type_index];
            return {
                width: type? type.width * this.scale : 375,
                height: type? type.height * this.scale : 667,
            };
        },
    },

    created () {
        // 设置机型列表
        this.mobile_types = [].concat(this.mobileTypes).concat(MOBILE_TYPES);

        this.$nextTick(() => {
            const editor = new E(this.$refs.toolbar, this.$refs.text);
            
            editor.config.placeholder = this.placeholder;

            editor.config.height = 300;

            // 图片是否直接转成base64
            editor.config.uploadImgShowBase64 = this.base64Img;

            // 自定义上传图片函数
            if (this.customUploadImg) {
                editor.config.customUploadImg = this.customUploadImg;
            }

            // 菜单配置
            editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'todo',
                'justify',
                'quote',
                'emoticon',
                'image',
                // 'video',
                // 'table',
                'code',
                'splitLine',
                'undo',
                'redo',
            ];

            // 内容改变事件
            editor.config.onchange = (content) => {
                this.$emit('input', content);
                this.$emit('change', content);
            };
            
            editor.create();
            editor.txt.html(this.value);
        });
    },

    methods: {
        changeMobileType (event) {
            this.mobile_type_index = event.srcElement.value;
        }
    }
}
</script>

<style scoped>
.editor {
    clear: both;
    position: relative;
}
.editor .toolbar {
    width: 95px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
}
.editor .view {
    border: 1px solid #ddd;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.editor .view-head {
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #f8f8f8;
    color: #000;
    font-size: 14px;
}
</style>