<template>
    <div id="markdown">
        <ul> 
            <li v-for="num in lines">   
                <p @keyup.enter="add" contenteditable="true" class="m-text">
                    <span contenteditable="false" class="sub">{{num}}</span>
                    123
                </p>
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
                width: 100%;

                p{
                    margin: 0;
                    padding: .2rem;
                    color: #fff;
                }
                .sub{
                    background: #272727;
                    text-align: center;
                    width: 10%;
                    display: block;
                    position: absolute;
                    height: 100%;
                    padding-top: .2rem;
                    line-height: inherit;
                    left: 0;
                    top: 0;
                }
                .m-text{
                    width: 100%;
                    padding-left: 10%;
                    background: #2D2D2D;
                    -webkit-user-select: text;
                    position: relative;

                }
            }
        }
    }
</style>
<script>
    export default {
       data () {
           return {
               lines: 1,
           }
       },
       methods: {
           add (ev) {
               ev.target.blur();
               console.log(ev.target.innerText)
               ev.target.innerHTML = ev.target.innerHTML.replace(/<br>/, '')
               this.lines++;
           }
       }

    }
</script>
