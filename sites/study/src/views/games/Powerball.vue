<template>
    <div class="row">
        <div class="col-12">
            <UrgentNotice/>
            <div class="content-box">
                <hr class="mt-0 pb-3 d-none d-xl-block">
                <div class="row">
                    <div class="col ">
                        <div class="title">
                            파워볼 <span>POWERBALL</span>
                        </div>
                    </div>
                    <div class="col-7 text-right d-none d-xl-block">
                        <div class="minigame-menu">
                            <ul>
                                <li>
                                    <div @click="$tools.pushRouter('/googlepowerball1', false)">구글 1분</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/googlepowerball3', false)">구글 3분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/speedladder', false)">스피드사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/coinpowerball', false)">코인 5분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/bogleladder', false)">보글사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/coinpowerball3', false)">코인 3분</div>
                                </li>
                                <li>
                                    <div  @click="$tools.pushRouter('/boglepowerball', false)">보글파워볼</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball', false)">EOS 5분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/kenoladder', false)">키노사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball3', false)">EOS 3분</div>
                                </li>
                                <li>
                                    <div @click="$tools.pushRouter('/powerladder', false)">파워사다리</div>
                                    <div class="mt-2" @click="$tools.pushRouter('/eospowerball1', false)">EOS 1분</div>
                                </li>
                                <li>
                                    <div class="active" @click="$tools.pushRouter('/powerball', false)">파워볼</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col px-0 d-xl-none">
                        <div class="header-mobile-menu">
                            <div class="header-mobile-menu-wrap">
                                <ul>
                                    <li @click="$tools.pushRouter('/powerball', false)">
                                        파워볼
                                        <div class="active"></div>
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
                <hr class="d-none d-xl-block">
                <div class="row mt-3">
                    <div class="col">
                        <div class="minigames px-xl-3">
                            <div class="row mt-xl-1" v-show="!isHide">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="broadcast">
                                                <div id="frame-wrap-woori">
                                                    <iframe class="iframe-game-woori" src="https://wb01.wooriball.com/game_info/frame_powerball_game.php" scrolling="no"></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col d-xl-none">
                                    <div class="row">
                                        <div class="col pl-5">
                                            <div class="game-title-time-second">
                                                중계 접기
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="game-title-time">
                                                마감 : {{ minute ? minute : '--' }}:{{ second ? second : '--' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 game-title-round">
                                            <span class="text-blue">{{ round }}</span> (<span class="text-blue">{{ rotation }}</span>) 회차
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-xl-4">
                                <div class="col d-none d-xl-block">
                                    <div class="row">
                                        <div class="col-7 game-title-round">
                                            <span class="text-blue">{{ round }}</span> (<span class="text-blue">{{ rotation }}</span>) 회차
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                중계 접기
                                            </div>
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                게임방법
                                            </div>
                                        </div>
                                        <div class="col px-0">
                                            <div class="game-title-time-second">
                                                공식홈페이지
                                            </div>
                                        </div>
                                        <div class="col pl-xl-0">
                                            <div class="game-title-time">
                                                마감 : {{ minute ? minute : '--' }}:{{ second ? second : '--' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-0 mt-xl-3">
                            <!-- MOBILE-파워볼 -->
                            <div class="row mt-3 d-md-none" id="section1">
                                <div class="col">파워볼 홀/짝</div>
                                <div class="col offset-1">파워볼 언더/오버</div>
                            </div>
                            <div class="row mt-2 d-md-none">
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBPOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPOE', 'Odd', games.PWBPOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPOE.rateOfOdd ? $numeral(games.PWBPOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBPOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPOE', 'Even', games.PWBPOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPOE.rateOfEven ? $numeral(games.PWBPOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBPUO' && betSelect === 'Under' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPUO', 'Under', games.PWBPUO.rateOfUnder)"
                                    >
                                        <div>언더</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPUO.rateOfUnder ? $numeral(games.PWBPUO.rateOfUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBPUO' && betSelect === 'Over' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPUO', 'Over', games.PWBPUO.rateOfOver)"
                                    >
                                        <div>오버</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPUO.rateOfOver ? $numeral(games.PWBPUO.rateOfOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- MOBILE-일반볼 -->
                            <div class="row mt-3 d-md-none" id="section2">
                                <div class="col">일반볼 홀/짝</div>
                                <div class="col offset-1">일반볼 언더/오버</div>
                            </div>
                            <div class="row mt-2 d-md-none">
                                <div class="col">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBNOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNOE', 'Odd', games.PWBNOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNOE.rateOfOdd ? $numeral(games.PWBNOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBNOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNOE', 'Even', games.PWBNOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNOE.rateOfEven ? $numeral(games.PWBNOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBNUO' && betSelect === 'Under' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNUO', 'Under', games.PWBNUO.rateOfUnder)"
                                    >
                                        <div>언더</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNUO.rateOfUnder ? $numeral(games.PWBNUO.rateOfUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBNUO' && betSelect === 'Over' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNUO', 'Over', games.PWBNUO.rateOfOver)"
                                    >
                                        <div>오버</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNUO.rateOfOver ? $numeral(games.PWBNUO.rateOfOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- MOBILE-파워볼 조합 -->
                            <div class="row mt-3 d-md-none" id="section3">
                                <div class="col-12 text-center">
                                    파워볼 홀/짝 + 언더/오버
                                </div>
                            </div>
                            <div class="row mt-2 d-md-none">
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'OddUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'OddUnder', games.PWBPCOMBO.rateOfOddUnder)"
                                    >
                                        <div>홀언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddUnder ? $numeral(games.PWBPCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'EvenUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'EvenUnder', games.PWBPCOMBO.rateOfEvenUnder)"
                                    >
                                        <div>짝언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenUnder ? $numeral(games.PWBPCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'OddOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'OddOver', games.PWBPCOMBO.rateOfOddOver)"
                                    >
                                        <div>홀오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddOver ? $numeral(games.PWBPCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'EvenOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'EvenOver', games.PWBPCOMBO.rateOfEvenOver)"
                                    >
                                        <div>짝오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenOver ? $numeral(games.PWBPCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- MOBILE-일반볼 조합 -->
                            <div class="row mt-3 d-md-none" id="section4">
                                <div class="col-12 text-center">
                                    일반볼 홀/짝 + 언더/오버
                                </div>
                            </div>
                            <div class="row mt-2 d-md-none">
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'OddUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'OddUnder', games.PWBNCOMBO.rateOfOddUnder)"
                                    >
                                        <div>홀언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddUnder ? $numeral(games.PWBNCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'EvenUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'EvenUnder', games.PWBNCOMBO.rateOfEvenUnder)"
                                    >
                                        <div>짝언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenUnder ? $numeral(games.PWBNCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'OddOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'OddOver', games.PWBNCOMBO.rateOfOddOver)"
                                    >
                                        <div>홀오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddOver ? $numeral(games.PWBNCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'EvenOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'EvenOver', games.PWBNCOMBO.rateOfEvenOver)"
                                    >
                                        <div>짝오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenOver ? $numeral(games.PWBNCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- MOBILE-일반볼 대중소 조합 -->
                            <div class="row mt-3 d-md-none" id="section5">
                                <div class="col-12">
                                    일반볼 홀/짝 + 대/중/소
                                </div>
                            </div>
                            <div class="row mt-2 d-md-none">
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddBig' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddBig', games.PWBBMSCOMBO.rateOfOddBig)"
                                    >
                                        <div>홀대</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddBig ? $numeral(games.PWBBMSCOMBO.rateOfOddBig).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddMiddle' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddMiddle', games.PWBBMSCOMBO.rateOfOddMiddle)"
                                    >
                                        <div>홀중</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddMiddle ? $numeral(games.PWBBMSCOMBO.rateOfOddMiddle).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet-mobile btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddSmall' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddSmall', games.PWBBMSCOMBO.rateOfOddSmall)"
                                    >
                                        <div>홀소</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddSmall ? $numeral(games.PWBBMSCOMBO.rateOfOddSmall).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenBig' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenBig', games.PWBBMSCOMBO.rateOfEvenBig)"
                                    >
                                        <div>짝대</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenBig ? $numeral(games.PWBBMSCOMBO.rateOfEvenBig).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenMiddle' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenMiddle', games.PWBBMSCOMBO.rateOfEvenMiddle)"
                                    >
                                        <div>짝중</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenMiddle ? $numeral(games.PWBBMSCOMBO.rateOfEvenMiddle).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet-mobile btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenSmall' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenSmall', games.PWBBMSCOMBO.rateOfEvenSmall)"
                                    >
                                        <div>짝소</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenSmall ? $numeral(games.PWBBMSCOMBO.rateOfEvenSmall).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- PC-파워볼 -->
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-12 game-sub-title">
                                    파워볼 숫자기준 -> 홀/짝, 언더/오버
                                </div>
                            </div>
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBPOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPOE', 'Odd', games.PWBPOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPOE.rateOfOdd ? $numeral(games.PWBPOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBPOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPOE', 'Even', games.PWBPOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPOE.rateOfEven ? $numeral(games.PWBPOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBPUO' && betSelect === 'Under' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPUO', 'Under', games.PWBPUO.rateOfUnder)"
                                    >
                                        <div>언더</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPUO.rateOfUnder ? $numeral(games.PWBPUO.rateOfUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBPUO' && betSelect === 'Over' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPUO', 'Over', games.PWBPUO.rateOfOver)"
                                    >
                                        <div>오버</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPUO.rateOfOver ? $numeral(games.PWBPUO.rateOfOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'OddUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'OddUnder', games.PWBPCOMBO.rateOfOddUnder)"
                                    >
                                        <div>홀언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddUnder ? $numeral(games.PWBPCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'EvenUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'EvenUnder', games.PWBPCOMBO.rateOfEvenUnder)"
                                    >
                                        <div>짝언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenUnder ? $numeral(games.PWBPCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'OddOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'OddOver', games.PWBPCOMBO.rateOfOddOver)"
                                    >
                                        <div>홀오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfOddOver ? $numeral(games.PWBPCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBPCOMBO' && betSelect === 'EvenOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBPCOMBO', 'EvenOver', games.PWBPCOMBO.rateOfEvenOver)"
                                    >
                                        <div>짝오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBPCOMBO.rateOfEvenOver ? $numeral(games.PWBPCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- PC-일반볼 -->
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-12 game-sub-title">
                                    일반볼 숫자합 기준 -> 홀/짝, 언더/오버
                                </div>
                            </div>
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBNOE' && betSelect === 'Odd' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNOE', 'Odd', games.PWBNOE.rateOfOdd)"
                                    >
                                        <div>홀</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNOE.rateOfOdd ? $numeral(games.PWBNOE.rateOfOdd).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBNOE' && betSelect === 'Even' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNOE', 'Even', games.PWBNOE.rateOfEven)"
                                    >
                                        <div>짝</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNOE.rateOfEven ? $numeral(games.PWBNOE.rateOfEven).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBNUO' && betSelect === 'Under' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNUO', 'Under', games.PWBNUO.rateOfUnder)"
                                    >
                                        <div>언더</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNUO.rateOfUnder ? $numeral(games.PWBNUO.rateOfUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBNUO' && betSelect === 'Over' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNUO', 'Over', games.PWBNUO.rateOfOver)"
                                    >
                                        <div>오버</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNUO.rateOfOver ? $numeral(games.PWBNUO.rateOfOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'OddUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'OddUnder', games.PWBNCOMBO.rateOfOddUnder)"
                                    >
                                        <div>홀언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddUnder ? $numeral(games.PWBNCOMBO.rateOfOddUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'EvenUnder' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'EvenUnder', games.PWBNCOMBO.rateOfEvenUnder)"
                                    >
                                        <div>짝언</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenUnder ? $numeral(games.PWBNCOMBO.rateOfEvenUnder).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'OddOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'OddOver', games.PWBNCOMBO.rateOfOddOver)"
                                    >
                                        <div>홀오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfOddOver ? $numeral(games.PWBNCOMBO.rateOfOddOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBNCOMBO' && betSelect === 'EvenOver' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBNCOMBO', 'EvenOver', games.PWBNCOMBO.rateOfEvenOver)"
                                    >
                                        <div>짝오</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBNCOMBO.rateOfEvenOver ? $numeral(games.PWBNCOMBO.rateOfEvenOver).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PC-일반볼 대중소 조합 -->
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-12 game-sub-title">
                                    일반볼 대중소 숫자합 기준
                                </div>
                            </div>
                            <div class="row d-none d-md-flex mt-3">
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddBig' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddBig', games.PWBBMSCOMBO.rateOfOddBig)"
                                    >
                                        <div>홀대</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddBig ? $numeral(games.PWBBMSCOMBO.rateOfOddBig).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddMiddle' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddMiddle', games.PWBBMSCOMBO.rateOfOddMiddle)"
                                    >
                                        <div>홀중</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddMiddle ? $numeral(games.PWBBMSCOMBO.rateOfOddMiddle).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md">
                                    <div
                                        class="btn-bet btn-bet-blue"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'OddSmall' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'OddSmall', games.PWBBMSCOMBO.rateOfOddSmall)"
                                    >
                                        <div>홀소</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfOddSmall ? $numeral(games.PWBBMSCOMBO.rateOfOddSmall).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenBig' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenBig', games.PWBBMSCOMBO.rateOfEvenBig)"
                                    >
                                        <div>짝대</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenBig ? $numeral(games.PWBBMSCOMBO.rateOfEvenBig).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenMiddle' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenMiddle', games.PWBBMSCOMBO.rateOfEvenMiddle)"
                                    >
                                        <div>짝중</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenMiddle ? $numeral(games.PWBBMSCOMBO.rateOfEvenMiddle).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-md mt-2 mt-md-0">
                                    <div
                                        class="btn-bet btn-bet-red"
                                        :class="betType === 'PWBBMSCOMBO' && betSelect === 'EvenSmall' ? 'game-active' : ''"
                                        @click="setBet(id, 'PWBBMSCOMBO', 'EvenSmall', games.PWBBMSCOMBO.rateOfEvenSmall)"
                                    >
                                        <div>짝소</div>
                                        <div class="rate">
                                            {{ this.end ? '--' : games.PWBBMSCOMBO.rateOfEvenSmall ? $numeral(games.PWBBMSCOMBO.rateOfEvenSmall).format('0.00') : '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2 mt-xl-5">
                    <div class="col-12">
                        <MinigameBetListRecent/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import MinigameBetListRecent from '@/components/MinigameBetListRecent.vue'
    import UrgentNotice from '@/components/UrgentNotice.vue'
    

    export default {
        name: 'Powerball',
        components: {
            MinigameBetListRecent,
            UrgentNotice,
        },
        computed: {
            ...mapGetters(['loading', 'betCart', 'router', 'isLogin']),
            betType() {
                return this.betCart.length > 0 ? this.betCart[0].betType : null
            },
            betSelect() {
                return this.betCart.length > 0 ? this.betCart[0].betSelect : null
            }
        },
        data() {
            return {
                isHide: false,
                end: false,
                id: null,
                rotation: 0,
                round: 0,
                gameTime: null,
                localTime: null,
                serverTime: null,
                minute: null,
                second: null,
                games: {
                    PWBPOE: { rateOfOdd: null, rateOfEven: null },
                    PWBPUO: { rateOfUnder: null, rateOfOver: null },
                    PWBPCOMBO: { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null },
                    PWBNOE: { rateOfOdd: null, rateOfEven: null },
                    PWBNUO: { rateOfUnder: null, rateOfOver: null },
                    PWBNCOMBO: { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null },
                    PWBBMS: { rateOfBig: null, rateOfMiddle: null, rateOfSmall: null },
                    PWBBMSCOMBO: { rateOfOddBig: null, rateOfOddMiddle: null, rateOfOddSmall: null, rateOfEvenBig: null, rateOfEvenMiddle: null, rateOfEvenSmall: null }
                },
                gameInterval: null,
                betlistInterval: null
            }
        },
        created() {
            //this.setFromRouter()
            this.getGame()
        },
        mounted() {
            window.addEventListener('resize', this.frameHandleResize)
            this.frameHandleResize()
        },
        methods: {
            ...mapActions(['deleteBetCartAll', 'getInformation', 'getMinigameBetListRecent', 'setCartMinigames']),
            frameHandleResize() {
                let sizeOfEleWidth = document.querySelector('.broadcast').offsetWidth
                if(sizeOfEleWidth > 873) {
                    document.querySelector('#frame-wrap-woori').style.width = '873px'
                    document.querySelector('#frame-wrap-woori').style.height = '707px'
                    document.querySelector('.iframe-game-woori').style.width = '873px'
                    document.querySelector('.iframe-game-woori').style.transform = 'scale(1.0)'
                }
                else {
                    document.querySelector('#frame-wrap-woori').style.width = '873px'
                    document.querySelector('.iframe-game-woori').style.width = '873px'

                    let sizeOfWidth = 873
                    let sizeOfHeight = 707

                    let windowWidth = window.innerWidth
                    let leftWidth = 280
                    let rightWidth = 280
                    let gameWidth = 0

                    if(windowWidth >= 1200) {
                        gameWidth = windowWidth - leftWidth - rightWidth - 112
                        if(gameWidth <= sizeOfWidth) {
                            sizeOfEleWidth = gameWidth
                        }
                    }

                    let resizePercentOfWidth = 0
                    resizePercentOfWidth = Math.floor(((sizeOfEleWidth / sizeOfWidth) * 1000) / 10) / 100

                    if(resizePercentOfWidth > 1) {
                        resizePercentOfWidth = 1.0
                    }

                    if(sizeOfEleWidth > sizeOfWidth) {
                        sizeOfEleWidth = sizeOfWidth;
                    }

                    let sizeOfEleHeight = Math.ceil(sizeOfHeight * resizePercentOfWidth)

                    if(sizeOfEleHeight > sizeOfHeight) {
                        sizeOfEleHeight = sizeOfHeight
                    }

                    if(sizeOfEleWidth > sizeOfWidth * resizePercentOfWidth) {
                        sizeOfEleWidth = Math.ceil(sizeOfWidth * resizePercentOfWidth)
                    }

                    document.querySelector('#frame-wrap-woori').style.width = sizeOfEleWidth + 'px'
                    document.querySelector('#frame-wrap-woori').style.height = sizeOfEleHeight + 'px'
                    document.querySelector('.iframe-game-woori').style.transform = 'scale(' + resizePercentOfWidth + ')'
                }
            },
            timeSet() {
                let term = this.$config.powerballTerm

                let now = (Date.now() + (this.serverTime - this.localTime))
                let distanceTime = ((this.gameTime - now) / 1000) - term

                let minute = '0' + Math.floor((distanceTime % (60 * 60)) / 60)
                let second = '0' + Math.floor((distanceTime % (60)))

                if(distanceTime <= 0) {
                    minute = '00'
                    second = '00'
                }

                if(minute.length > 2) { minute = minute.substring(1, 3) }
                if(second.length > 2) { second = second.substring(1, 3) }

                this.minute = minute
                this.second = second

                if(distanceTime <= 0) {
                    this.end = true
                    this.deleteBetCartAll()
                }
                else {
                    this.end = false
                }

                if(distanceTime <= (term + 3) * -1) {
                    clearInterval(this.gameInterval)
                    this.getGame()

                    clearTimeout(this.betlistInterval)
                    this.betlistInterval = setTimeout(() => {
                        this.getMinigameBetListRecent()
                        this.getInformation()
                    }, 20000)
                }
            },
            async getGame() {
                let r = await this.$http.get('/api/get-powerball')

                if(!r.data) {
                    this.end = true
                    if(this.router === 'Powerball') {
                        this.gameInterval = setInterval(() => {
                            this.timeSet()
                        }, 1000)
                    }
                    else {
                        clearInterval(this.gameInterval)
                        clearTimeout(this.betlistInterval)
                    }
                    return
                }

                //console.log(r.data.rotation, this.rotation)
                //if(r.data.rotation > 0 && r.data.rotation > this.rotation && this.rotation === 0) {
                this.getMinigameBetListRecent()
                //}

                this.id = r.data._id
                if(r.data.rotation > 0 && r.data.rotation > this.rotation) {
                    this.gameTime = new Date(this.$moment(r.data.gameDateTime).format('YYYY/MM/DD HH:mm:ss')).getTime()

                    this.localTime = Date.now()
                    this.serverTime = r.data.serverTime

                    this.rotation = r.data.rotation
                    this.round = r.data.round
                    this.games = r.data.games
                    if(!r.data.games.PWBPOE) {
                        this.games.PWBPOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.PWBPUO) {
                        this.games.PWBPUO = { rateOfUnder: null, rateOfOver: null }
                    }
                    if(!r.data.games.PWBPCOMBO) {
                        this.games.PWBPCOMBO = { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null }
                    }
                    if(!r.data.games.PWBNOE) {
                        this.games.PWBNOE = { rateOfOdd: null, rateOfEven: null }
                    }
                    if(!r.data.games.PWBNUO) {
                        this.games.PWBNUO = { rateOfUnder: null, rateOfOver: null }
                    }
                    if(!r.data.games.PWBBMS) {
                        this.games.PWBBMS = { rateOfBig: null, rateOfMiddle: null, rateOfSmall: null }
                    }
                    if(!r.data.games.PWBNCOMBO) {
                        this.games.PWBNCOMBO = { rateOfOddUnder: null, rateOfEvenUnder: null, rateOfOddOver: null, rateOfEvenOver: null }
                    }
                    if(!r.data.games.PWBBMSCOMBO) {
                        this.games.PWBBMSCOMBO = { rateOfOddBig: null, rateOfOddMiddle: null, rateOfOddSmall: null, rateOfEvenBig: null, rateOfEvenMiddle: null, rateOfEvenSmall: null }
                    }
                }

                if(this.router === 'Powerball') {
                    this.gameInterval = setInterval(() => {
                        this.timeSet()
                    }, 1000)
                }
                else {
                    clearInterval(this.gameInterval)
                    clearTimeout(this.betlistInterval)
                }
            },
            setBet(_id, betType, betSelect, selectRate) {
                if(!this.isLogin) {
                    this.$tools.sw('info', '로그인', '로그인 후 이용 가능 합니다.')
                    return
                }

                if(this.end || !selectRate) return

                if(betType === this.betType && betSelect === this.betSelect) {
                    this.deleteBetCartAll()
                }
                else {
                    let section = ''
                    if(betType === 'PWBPOE' || betType === 'PWBPUO') {
                        section = '#section1'
                    }
                    else if(betType === 'PWBNOE' || betType === 'PWBNUO') {
                        section = '#section2'
                    }
                    else if(betType === 'PWBPCOMBO') {
                        section = '#section3'
                    }
                    else if(betType === 'PWBNCOMBO') {
                        section = '#section4'
                    }
                    else {
                        section = '#section5'
                    }

                    if(window.innerWidth < 1200) {
                        this.$scrollTo(section, 300, { offset: -70 })
                    }

                    this.setCartMinigames({
                        _id,
                        gameInfo: `${this.round} (${this.rotation}) 회차`,
                        gameType: 'minigame',
                        gameKind: 'powerball',
                        betType,
                        betSelect,
                        selectRate
                    })
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            window.removeEventListener('resize', this.frameHandleResize)
            clearInterval(this.gameInterval)
            clearTimeout(this.betlistInterval)
            this.deleteBetCartAll()
            // document.querySelector('#betAmount').value = 0
            // this.$store.commit('setBetAmount', 0)
            next()
        }
    }
</script>

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
        padding-top: 20px;
        padding-bottom: 0;

        .header-mobile-menu-wrap {
            width: 1060px;

            ul {
                
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    padding-left: 15px;
                    padding-right: 5px;
                    float: left;
                    color: #333;
                    font-size: 0.9375rem;
                    
                    .active {
                        padding: 1px;
                        border-bottom: 1px solid #0E3B72;
                    }
                }
            }
        }
    }
</style>