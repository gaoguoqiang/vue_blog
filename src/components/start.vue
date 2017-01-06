<template>
    <div class="start-bg animated" v-bind:class="{zoomOut:show}">
        <img class="img-responsive" src="../assets/images/start-bg.png" alt="">
        <div class="name animated" v-bind:class="{fadeInDown:start, fadeOutLeftBig:end}">
            <h2>S</h2>
            <h2>A</h2>
            <h2>M</h2>
        </div>
        <p class="title animated" v-bind:class="{fadeInDown:start, fadeOutRight:end}">身体和灵魂，总有一个在路上</p>
        <div @click="open" class="breathe-btn">start...</div>
    </div>
</template>
<style>
    body{
        width: 100%;
        height: 100%;
        font-family: "Adobe 宋体 Std L",'Arial';
    }
    .start-bg{
        width: 100%;
        height: 100%;
    }
    .name{
        width: 40px;
        position: absolute;
        top: 10%;
        left: 50%;
        margin-left: -20px;
    }
    .name h2{
        text-align: center;
        font-size: 35px;
    }
    .title{
        width: 100%;
        position: absolute;
        top: 60%;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }
    .breathe-btn{ position:absolute; bottom:20px; left: 50%; margin-left: -50px; width:100px; height:40px; line-height:40px; border:1px solid #2b92d4; border-radius:5px; color:#fff; font-size:20px; text-align:center; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,.3); overflow:hidden;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#6cc3fe), to(#21a1d0));
        background-image: -moz-linear-gradient(#6cc3fe,#21a1d0);
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-name: breathe;
        -webkit-animation-duration: 2700ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation:ease-in-out breathe 2700ms infinite alternate;
    }
    @keyframes breathe{
        0% { opacity: .2; box-shadow:0 1px 2px rgba(255,255,255,0.1);}
        100% { opacity: 1; border:1px solid rgba(59,235,235,1); box-shadow:0 1px 30px rgba(59,255,255,1);}
    }
    @-webkit-keyframes breathe {
        0% { opacity: .2; box-shadow:0 1px 2px rgba(255,255,255,0.1);}
        100% { opacity: 1; border:1px solid rgba(59,235,235,1); box-shadow:0 1px 30px rgba(59,255,255,1);}
    }
</style>
<script>
    export default{
        data(){
            return {
                start: true,
                end: false,
                show: false
            }
        },
        methods: {
            open () {
                this.start = false;
                this.end = true;
                setTimeout(()=>{this.show = true},1000)
            }
        },
        watch: {
            show(){
                /*
                * 动画完成后，start-bg   block: none;
                * */
                $('.start-bg').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ()=>{$('.start-bg').hide()});
            }
        }
    }
</script>
