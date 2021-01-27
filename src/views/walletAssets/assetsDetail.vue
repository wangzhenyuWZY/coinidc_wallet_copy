<template>
    <div class="assetsContainer">
        <div class="coinHead">
            <img src="">
            <h2>IDCT</h2>
            <p>CoinIDC Token</p>
        </div>
        <h2 class="assetstitle">基本信息</h2>
        <div class="coinDetail">
            <div class="detailItem">
                <span class="fl">官网</span>
                <div class="fr">
                    <a>https://www.coinidc.com</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">白皮书</span>
                <div class="fr">
                    <a>IDCT白皮书</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">发行量</span>
                <div class="fr">
                    <span>74234795</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">流通量</span>
                <div class="fr">
                    <span>2922</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">持有者</span>
                <div class="fr">
                    <span>21221278786</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">审计报告</span>
                <div class="fr">
                    <a>IDCT 审计报告</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">社区</span>
                <div class="fr">
                    <a><img src="../../assets/tuite.png"></a>
                    <a><img src="../../assets/facebook.png"></a>
                </div>
            </div>
        </div>
        <h2 class="assetstitle">简介</h2>
        <div class="coinDetail">
            <p class="coinInfo">      波场TRON以推动互联网去中心化为己任，致力于为去中心化互联网搭建基础设施。旗下的TRON协议是全球最大的基于区块链的去中心化应用操作系统协 议之一，为协议上的去中心化应用运行提供高吞吐，高扩展，高可靠性的底层公链支持。波场TRON还通过创新的可插拔智能合约平台为以太坊智能合约提供更好的兼容性。</p>
        </div>
    </div>
</template>
<style lang='less' scoped>
.assetsContainer{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:#F7F8FA;
    .coinHead{
        padding:24px 20px;
        overflow: hidden;
        img{
            width:60px;
            height:60px;
            float:left;
            margin-right:15px;
        }
        h2{
            font-size:16px;
            color:#000000;
            line-height:22px;
            font-weight: 600;
            padding-bottom:10px;
            padding-top:6px;
        }
        p{
            font-size:12px;
            color:#8997B3;
            line-height:17px;
        }
    }
    .assetstitle{
        font-size:14px;
        color:#8997B3;
        line-height:20px;
        padding:0 10px 12px;
    }
    .coinDetail{
        background:#fff;
        padding:16px 10px;
        margin-bottom:20px;
        .coinInfo{
            font-size:14px;
            color:#4F4F4F;
            line-height:23px;
            text-indent: 15px;
        }
        .detailItem{
            overflow: hidden;
            padding-bottom:12px;
            .fl{
                float:left;
                font-size:14px;
                color:#8997B3;
                line-height:20px;
            }
            .fr{
                float:right;
                a{
                    font-size:14px;
                    color:#1C63FF;
                    line-height:20px;
                    text-align:right;
                    img{
                        width:20px;
                        height: 20px;
                        margin-left:10px;
                    }
                }
                span{
                    font-size:14px;
                    color:#000000;
                    line-height:20px;
                    text-align:right;
                }
            }
        }
    }
}
</style>