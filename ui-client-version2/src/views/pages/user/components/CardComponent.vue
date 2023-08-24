<template>
    <div class="card-component">
        <div class="title">
            <span>{{title}}</span>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardComponent",
        props: {
            title: {type: String, default: ''}
        }
    }
</script>

<style scoped>
    .card-component {
        width: auto;
        height: auto;
        margin: 10px;
        position: relative;
        min-height: 300px;
        background: #35394b;
        border: 2px solid rgb(59, 38, 38);
        border-radius: 10px;
        box-shadow: 1px 42px 5px 0px rgb(113, 106, 189) inset;
    }

    .title {
        width: 100%;
        height: 42px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 9px 9px 0 0 ;
    }
    .title span{
        color: #fafdff;
        margin-left: 25px;
        line-height: 42px;
        border-left: 3px #d3e5ad solid;
        padding-left: 22px;
        border-radius: 50px 0 0 50px;
        letter-spacing: 5px;
        font-size: 18px;
    }

    .content {
        margin-top: 42px;
        padding: 8px 8px 8px 12px;
        color: white;
    }
</style>
