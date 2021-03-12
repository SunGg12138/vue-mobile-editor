<template>
    <div id="app">
        <mobile-editor
            v-model="content"
            :show-view-head="true"
            view-head-text="我的文章"
            :view-head-style="{ color: 'white', backgroundColor: 'green' }"
            :view-style="{ borderColor: 'yellow' }"
            @change="change"
        >
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
            content: '<h1>好多年</h1>'
        };
    },

    methods: {
        change () {
            console.log('change', this.content);
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
