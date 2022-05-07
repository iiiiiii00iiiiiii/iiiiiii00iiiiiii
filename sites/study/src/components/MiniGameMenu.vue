<template>
    <div class="row mt-2">
        <div class="col px-0 d-xl-none">
            <div class="header-mobile-menu">
                <div class="header-mobile-menu-wrap">
                    <ul>
                        <li @click="$tools.pushRouter('/powerball', false)">
                            <div class="active">파워볼</div>
                        </li>
                        <li @click="$tools.pushRouter('/powerladder', false)">파워사다리</li>
                        <li @click="$tools.pushRouter('/kenoladder', false)">키노사다리</li>
                        <li @click="$tools.pushRouter('/boglepowerball', false)">보글파워볼</li>
                        <li @click="$tools.pushRouter('/bogleladder', false)">보글사다리</li>
                        <li @click="$tools.pushRouter('/speedladder', true)">스피드사다리</li>
                        <li @click="$tools.pushRouter('/googlepowerball1', false)">구글 1분</li>
                        <li @click="$tools.pushRouter('/googlepowerball3', false)">구글 3분</li>
                        <li @click="$tools.pushRouter('/eospowerball1', false)">EOS 1분</li>
                        <li @click="$tools.pushRouter('/eospowerball3', false)">EOS 3분</li>
                        <li @click="$tools.pushRouter('/eospowerball', false)">EOS 5분</li>
                        <li @click="$tools.pushRouter('/coinpowerball3', false)">코인 3분</li>
                        <li @click="$tools.pushRouter('/coinpowerball', false)">코인 5분</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-mobile-menu {
        overflow-x: auto;
        &::-webkit-scrollbar {
            width: 1px; /*스크롤바의 너비*/
            height: 1px; /*스크롤바의 높이*/
        }
        &::-webkit-scrollbar-thumb {
            background-color: inherit; /*스크롤바의 색상*/
        }
        &::-webkit-scrollbar-track {
            background-color: inherit; /*스크롤바 트랙 색상*/
        }
        padding-top: 8px;
        padding-bottom: 5px;

        .header-mobile-menu-wrap {
            width: 1060px;

            ul {
                
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding: 5px 0;
                    padding-left: 15px;
                    padding-right: 5px;
                    line-height: 30px;
                    float: left;
                    color: #333;
                    font-size: 0.9375rem;
                    font-weight: 500;

                    &:hover {
                        color: #0e3b72;
                    }
                    .active {
                        border-bottom: 1px solid #0E3B72;
                    }
                }
            }
        }
    }
</style>