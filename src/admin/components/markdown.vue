<template>
    <div id="markdown">
        <ul>
            <li>
                <p class="sub">1</p>
            </li>
            <li>
                <p contenteditable="true" class="m-text">{{text}}</p>
            </li>
        </ul>
    </div>
</template>
<style lang="less">
    *{
        -webkit-user-select: auto;
    }
    #markdown{
        width: 90%;
        margin: 2.5rem auto;
        border: 1px solid #000;
        border-radius: .5rem;
        overflow: hidden;
        ul {
            width: 100%;
            margin: 0;
            padding: 0;
            li{
                float: left;
                list-style: none;
                padding: 0;

                p{
                    margin: 0;
                    padding: .2rem;
                    color: #fff;
                }
                .sub{
                    background: #272727;
                    text-align: center;
                }
                .m-text{
                    width: 100%;
                    background: #2D2D2D;
                    -webkit-user-select: text;

                }
            }
            li:nth-child(1){
                width: 10%;
            }
            li:nth-child(2){
                width: 90%;
            }
        }
    }
</style>
<script>
    export default {
       data () {
           return {
               text: 'hello my name is sam'
           }
       }
    }
</script>
