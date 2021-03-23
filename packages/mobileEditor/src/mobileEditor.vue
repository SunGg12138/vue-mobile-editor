<template>
    <div>
        <div class="editor">
            <div ref="toolbar" class="toolbar"></div>
            <div style="margin-left: 95px;">
                <div style="margin: 0 auto;" :style="size_style">
                    <div class="view" :style="view_style">
                        <div v-if="showViewHead" class="view-head" v-text="viewHeadText" :style="view_head_style"></div>
                        <div class="content" :style="Object.assign({}, size_style, contentStyle)">
                            <div style="margin-bottom: 8px;"><slot name="content-head"></slot></div>
                            <div ref="text" style="min-height: 500px;"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 42px;">
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
            scale: 0.75,

            editor: {},
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
        },
    },

    watch: {
        value (newVal, oldVal) {
            if (newVal !== oldVal && newVal !== this.editor.txt.html()) {
                this.editor.txt.html(this.value);
            }
        },
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
        size_style () {
            return { width: this.view_size.width + 'px', height: this.view_size.height + 'px' };
        }
    },

    created () {
        // 设置机型列表
        this.mobile_types = [].concat(this.mobileTypes).concat(MOBILE_TYPES);

        this.$nextTick(() => {
            const editor = this.editor = new E(this.$refs.toolbar, this.$refs.text);
            
            editor.config.placeholder = this.placeholder;

            editor.config.height = 500;

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
}
.editor .toolbar {
    width: 95px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
}
.editor .view {
    position: relative;
    border: 1px solid #ddd;
    overflow: hidden;
}
.editor .content {
    margin-top: 32px;
    overflow-y: scroll;
}
.editor .view-head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #f8f8f8;
    color: #000;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

</style>