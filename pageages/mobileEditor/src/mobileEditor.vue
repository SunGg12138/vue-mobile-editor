<template>
    <div>
        <div class="editor">
            <div ref="toolbar" class="toolbar"></div>
            <div style="margin-left: 100px;">
                <div style="margin: 0 auto;" :style="{ width: view_size.width * view_scale + 'px', height: view_size.height * view_scale + 'px' }">
                    <div class="view" :style="viewStyle">
                        <div v-if="showViewHead" class="view-head" v-text="viewHeadText" :style="viewHeadStyle"></div>
                        <div class="content" :style="contentStyle">
                            <slot name="content-head"></slot>
                            <div ref="text" class="text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor';
export default {
    name: 'MobileEditor',

    data () {
        return {
            view_size: {
                width: 750,
                height: 1334
            },
            view_scale: 0.45,
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
        uploadImgFunc: {
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
    },

    created () {
        this.$nextTick(() => {
            const editor = new E(this.$refs.toolbar, this.$refs.text);

            editor.config.placeholder = this.placeholder;
            editor.config.uploadImgShowBase64 = this.base64Img;

            if (this.uploadImgFunc) {
                editor.config.customUploadImg = this.uploadImgFunc;
            }

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

            editor.config.onchange = (content) => {
                this.$emit('input', content);
                this.$emit('change', content);
            };
            
            editor.create();
            editor.txt.html(this.value);
        });
    },
}
</script>

<style scoped>
.editor {
    clear: both;
    position: relative;
}
.editor .toolbar {
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
}
.editor .view {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
}
.editor .view-head {
    line-height: 40px;
    text-align: center;
    background: #eee;
    color: #666;
}
</style>