<template>
    <div id="app">
        <mobile-editor
            v-model="content"
            :show-view-head="true"
            view-head-text="我的文章"
            :view-head-style="{ color: '#000', backgroundColor: '#f8f8f8' }"
            :view-style="{ borderColor: '#ddd' }"
            :mobile-types="mobile_types"
            @change="change"
            placeholder="在这里输入..."
        >
            <!-- 内容头部信息，可以展示标题名称，发布时间等信息 -->
            <div slot="content-head" style="padding: 0 10px;">
                <div style="font-size: 18px; padding: 10px 0;">好好吃饭，天天向上</div>
                <div class="caption">
                    <span>来源：社区文社</span>
                    <span style="float: right;">更新时间：2021-03-31</span>
                </div>
            </div>
        </mobile-editor>
    </div>
</template>

<script>
export default {
    name: "App",
    data () {
        return {
            content: '<b>好多年</b>',
            mobile_types: [{
                name: '自定义 400*600',
                width: 400,
                height: 600,
            }]
        };
    },

    methods: {
        change () {
            // console.log('change', this.content);
        },
    }
};
</script>

<style>
#app {
    padding: 50px 100px 0;
}
.caption {
    color: #aaa;
    font-size: 13px;
}
</style>
