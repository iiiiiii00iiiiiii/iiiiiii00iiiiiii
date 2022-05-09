<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-12 nrgent-notice d-xl-none" v-if="isLogin">
                    <div class="row">
                        <div class="col-2">
                            <div class="notice-button">공지</div>
                        </div>
                        <div class="col-9 notice">
                            <marquee direction="left">신규회원 베팅규정 필독후 이용해주시기를 바라며, 고객센터 계좌문의후 입금을 해주시기를 바랍니다.</marquee>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col px-0 main-banner d-none d-xl-block">
                    <b-carousel
                        :interval="5000"
                        img-width="1634"
                        img-height="432"
                        fade
                        background="#ababab"
                    >
                        <b-carousel-slide img-src="images/main-banner-01.jpg" style="height:432px"></b-carousel-slide>
                        <!-- <b-carousel-slide img-src="images/main-banner-02.jpg" style="height:432px"></b-carousel-slide>
                        <b-carousel-slide img-src="images/main-banner-03.jpg" style="height:432px"></b-carousel-slide> -->
                    </b-carousel>
                </div>
                <div class="col-12 px-3 mobile-main-banner-bg d-xl-none">
                    <!-- <b-carousel
                        :interval="5000"
                        img-width="1634"
                        img-height="414"
                        fade
                        background="#ababab"
                    >
                        <b-carousel-slide img-src="images/mobile-main-banner-01.jpg"></b-carousel-slide>
                    </b-carousel> -->
                    <img src="images/mobile-main-banner-01.png" class="mobile-main-banner my-2">
                </div>
            </div>
            <!-- PC 버전 메뉴 -->
            <div class="row d-none d-xl-block">
                <div class="col">
                    <div class="minigame-main-banner">
                        <div class="row">
                            <div class="col">
                                <div class="minigame-main-banner-title">STUDY GAMES</div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-powerball.jpg" @click="$tools.pushRouter('/powerball', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    파워볼
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-powerladder.jpg" @click="$tools.pushRouter('/powerladder', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    POWER LADDER
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    파워사다리
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-kenoladder.jpg" @click="$tools.pushRouter('/kenoladder', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    KENO LADDER
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    키노사다리
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-boglepowerball.jpg" @click="$tools.pushRouter('/boglepowerball', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    BUBBLE POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    보글파워볼
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-bogleladder.jpg" @click="$tools.pushRouter('/bogleladder', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    BUBBLE LADDER
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    보글사다리
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-googlepowerball3.jpg" @click="$tools.pushRouter('/googlepowerball3', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    GOOGLE 3M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    구글 3분파워볼
                                </div>
                            </div>
                            <div class="col">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-googlepowerball1.jpg" @click="$tools.pushRouter('/googlepowerball1', false)">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    GOOGLE 1M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    구글 1분파워볼
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row d-none d-xl-block">
                <div class="col">
                    <div class="minigame-main-banner second">
                        <div class="row mt-4">
                            <div class="col" @click="$tools.pushRouter('/eospowerball', false)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-eospowerball5.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    EOS 5M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    EOS 5분파워볼
                                </div>
                            </div>
                            <div class="col" @click="$tools.pushRouter('/eospowerball3', false)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-eospowerball3.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    EOS 3M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    EOS 3분파워볼
                                </div>
                            </div>
                            <div class="col" @click="$tools.pushRouter('/eospowerball1', false)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-eospowerball1.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    EOS 1M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    EOS 1분파워볼
                                </div>
                            </div>
                            <div class="col" @click="$tools.pushRouter('/coinpowerball', false)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-coinpowerball5.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    COIN 5M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    코인 5분파워볼
                                </div>
                            </div>
                            <div class="col" @click="$tools.pushRouter('/coinpowerball3', false)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-coinpowerball3.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    COIN 3M POWERBALL
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    코인 3분파워볼
                                </div>
                            </div>
                            <div class="col" @click="$tools.pushRouter('/casino', true)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-casino.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    LIVE CASINO
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    라이브 카지노
                                </div>
                            </div>
                            <!-- <div class="col" @click="openKplay(0)"> -->
                            <div class="col" @click="openKplay(0)">
                                <div class="minigame-main-banner-img">
                                    <img src="/images/banner-slots.jpg">
                                </div>
                                <div class="minigame-main-banner-game-subtitle">
                                    SLOTS
                                </div>
                                <div class="minigame-main-banner-game-title">
                                    슬롯게임
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MOBILE 버전 메뉴 -->
            <div class="row d-xl-none">
                <div class="col px-3">
                    <div class="minigame-main-banner">
                        <div class="row mt-3">
                            <div class="col pl-2">
                                <div class="minigame-main-banner-title">STUDY GAMES</div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col mobile-mini-game">
                                <div class="mmobile-mini-game-img">
                                    <ul>
                                        <li>
                                            <img src="/images/banner-powerball.jpg" @click="$tools.pushRouter('/powerball', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-powerladder.jpg" @click="$tools.pushRouter('/powerladder', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-kenoladder.jpg" @click="$tools.pushRouter('/kenoladder', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-boglepowerball.jpg" @click="$tools.pushRouter('/boglepowerball', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-bogleladder.jpg" @click="$tools.pushRouter('/bogleladder', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-googlepowerball3.jpg" @click="$tools.pushRouter('/googlepowerball3', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-googlepowerball1.jpg" @click="$tools.pushRouter('/googlepowerball1', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-eospowerball5.jpg" @click="$tools.pushRouter('/eospowerball', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-eospowerball3.jpg" @click="$tools.pushRouter('/eospowerball3', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-eospowerball1.jpg" @click="$tools.pushRouter('/eospowerball1', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-coinpowerball5.jpg" @click="$tools.pushRouter('/coinpowerball', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-coinpowerball3.jpg" @click="$tools.pushRouter('/coinpowerball3', false)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-casino.jpg" @click="$tools.pushRouter('/casino', true)">
                                        </li>
                                        <li>
                                            <img src="/images/banner-slots.jpg" @click="openKplay(0)">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- PC 버전 Dash board -->
            <div class="row mt-4 d-none d-xl-block">
                <div class="col">
                    <div class="dashboard-ranking">
                        <div class="row">
                            <div class="col">
                                <div class="dashboard-ranking-wrap">
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="ranking-title">
                                                        금주의 출금 TOP
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="ranking-title">
                                                        실시간 입출금현황
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-6 pr-2">
                                                    <div class="ranking-wrap">
                                                        <marquee
                                                            class="border-box"
                                                            behavior="scroll"
                                                            direction="up"
                                                            loop="infinite"
                                                            scrolldelay="150"
                                                            scrollamount="3"
                                                            height="240px"
                                                        >
                                                            <div class="row" :class="index === 0 ? 'mt-1' : 'mt-2'" v-for="(item, index) in topExchange" :key="index">
                                                                <div class="col">
                                                                    <ul class="ranking-ul">
                                                                        <li>
                                                                            <span>{{ index + 1 }}</span>
                                                                        </li>
                                                                        <li>
                                                                            {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                                                        </li>
                                                                        <li class="exchange">
                                                                            {{ $numeral(item.amount).format('0,0') }}
                                                                        </li>
                                                                        <li class="exchange">
                                                                            <span>환전</span>
                                                                        </li>
                                                                        <li>
                                                                            {{ item.id.substring(0, 2) }}****
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </marquee>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="ranking-wrap">
                                                        <marquee
                                                            class="border-box"
                                                            behavior="scroll"
                                                            direction="up"
                                                            loop="infinite"
                                                            scrolldelay="150"
                                                            scrollamount="3"
                                                            height="240px"
                                                        >
                                                            <div class="row" :class="index === 0 ? 'mt-1' : 'mt-2'" v-for="(item, index) in realTimeChargeExchange" :key="index">
                                                                <div class="col">
                                                                    <ul class="ranking-ul">
                                                                        <li>
                                                                            <span>{{ index + 1 }}</span>
                                                                        </li>
                                                                        <li>
                                                                            {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                                                        </li>
                                                                        <li :class="item.type === 'C' ? 'charge' : 'exchange'">
                                                                            {{ $numeral(item.amount).format('0,0') }}
                                                                        </li>
                                                                        <li :class="item.type === 'C' ? 'charge' : 'exchange'">
                                                                            <span>
                                                                                {{ item.type === 'C' ? '충전' : '환전' }}
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            {{ item.id.substring(0, 2) }}****
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </marquee>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-5">
                                            <div class="dashboard-board">
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="dashboard-board-title">
                                                            <span @click="selectBoard = 'notice'" :class="selectBoard === 'notice' ? 'active' : ''">공지사항</span>
                                                            <span class="px-3">
                                                                <img src="/images/vertical-line-board.jpg">
                                                            </span>
                                                            <span @click="selectBoard = 'faq'" :class="selectBoard === 'faq' ? 'active' : ''">FAQ</span>
                                                            <span class="px-3">
                                                                <img src="/images/vertical-line-board.jpg">
                                                            </span>
                                                            <span @click="selectBoard = 'event'" :class="selectBoard === 'event' ? 'active' : ''">이벤트</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-1">
                                                    <div class="col">
                                                        <div class="board-wrap" v-show="selectBoard === 'notice'">
                                                            <div class="row mt-2" v-for="(item, index) in notice" :key="index">
                                                                <div class="col">
                                                                    <ul class="board-ul">
                                                                        <li>
                                                                            공지사항
                                                                        </li>
                                                                        <li @click="$tools.pushRouter(`/notice/detail/${item._id}/1`, true)">
                                                                            {{ item.title }}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="board-wrap" v-show="selectBoard === 'faq'">
                                                            <div class="row mt-2" v-for="(item, index) in faq" :key="index">
                                                                <div class="col">
                                                                    <ul class="board-ul">
                                                                        <li>
                                                                            FAQ
                                                                        </li>
                                                                        <li @click="$tools.pushRouter(`/faq/detail/${item._id}/1`, true)">
                                                                            {{ item.title }}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="board-wrap" v-show="selectBoard === 'event'">
                                                            <div class="row mt-2" v-for="(item, index) in event" :key="index">
                                                                <div class="col">
                                                                    <ul class="board-ul">
                                                                        <li>
                                                                            이벤트
                                                                        </li>
                                                                        <li @click="$tools.pushRouter(`/event/detail/${item._id}/1`, true)">
                                                                            {{ item.title }}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MOBILE 버전 Dash board -->
            <div class="row mt-3 d-xl-none">
                <div class="col px-3">
                    <div class="dashboard-board">
                        <div class="row">
                            <div class="col">
                                <div class="dashboard-board-title">
                                    <span @click="selectBoard = 'notice'" :class="selectBoard === 'notice' ? 'active' : ''">공지사항</span>
                                    <span class="px-3">
                                        <img src="/images/vertical-line-board.jpg">
                                    </span>
                                    <span @click="selectBoard = 'faq'" :class="selectBoard === 'faq' ? 'active' : ''">FAQ</span>
                                    <span class="px-3">
                                        <img src="/images/vertical-line-board.jpg">
                                    </span>
                                    <span @click="selectBoard = 'event'" :class="selectBoard === 'event' ? 'active' : ''">이벤트</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="board-wrap" v-show="selectBoard === 'notice'">
                                    <div class="row" v-for="(item, index) in notice" :key="index">
                                        <div class="col">
                                            <ul class="board-ul">
                                                <li>
                                                    공지사항
                                                </li>
                                                <li @click="$tools.pushRouter(`/notice/detail/${item._id}/1`, true)">
                                                    {{ item.title }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="board-wrap" v-show="selectBoard === 'faq'">
                                    <div class="row" v-for="(item, index) in faq" :key="index">
                                        <div class="col">
                                            <ul class="board-ul">
                                                <li>
                                                    FAQ
                                                </li>
                                                <li  @click="$tools.pushRouter(`/faq/detail/${item._id}/1`, true)">
                                                    {{ item.title }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="board-wrap" v-show="selectBoard === 'event'">
                                    <div class="row" v-for="(item, index) in event" :key="index">
                                        <div class="col">
                                            <ul class="board-ul">
                                                <li>
                                                    이벤트
                                                </li>
                                                <li @click="$tools.pushRouter(`/event/detail/${item._id}/1`, true)">
                                                    {{ item.title }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3 d-xl-none">
                <div class="col px-3">
                    <div class="dashboard-board">
                        <div class="row">
                            <div class="col">
                                <div class="dashboard-board-title">
                                    <span :class="selectCommunication === 0 ? 'active' : ''"
                                            @click="changeCommunication(0)">
                                            금주의 출금 TOP
                                    </span>
                                </div>
                            </div>
                            <div class="col">
                                <div class="dashboard-board-title">
                                    <span :class="selectCommunication === 1 ? 'active' : ''"
                                            @click="changeCommunication(1)">
                                            실시간 입출금현황
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" v-show="selectCommunication === 0">
                                <div class="dashboard-ranking">
                                    <div class="row">
                                        <div class="col">
                                            <div class="dashboard-ranking-wrap">
                                                <div class="row mt-2">
                                                    <div class="col-12">
                                                        <div class="ranking-wrap">
                                                            <marquee
                                                                class="border-box"
                                                                behavior="scroll"
                                                                direction="up"
                                                                loop="infinite"
                                                                scrolldelay="150"
                                                                scrollamount="3"
                                                                height="190px"
                                                            >
                                                                <div class="row" :class="index === 0 ? 'mt-1' : 'mt-2'" v-for="(item, index) in topExchange" :key="index">
                                                                    <div class="col">
                                                                        <ul class="ranking-ul">
                                                                            <li>
                                                                                <span>{{ index + 1 }}</span>
                                                                            </li>
                                                                            <li>
                                                                                {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                                                            </li>
                                                                            <li class="exchange">
                                                                                {{ $numeral(item.amount).format('0,0') }}
                                                                            </li>
                                                                            <li class="exchange">
                                                                                <span>환전</span>
                                                                            </li>
                                                                            <li>
                                                                                {{ item.id.substring(0, 2) }}****
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </marquee>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" v-show="selectCommunication === 1">
                                <div class="dashboard-ranking">
                                    <div class="row">
                                        <div class="col">
                                            <div class="dashboard-ranking-wrap">
                                                <div class="row mt-2">
                                                    <div class="col-12">
                                                        <div class="ranking-wrap">
                                                            <marquee
                                                                class="border-box"
                                                                behavior="scroll"
                                                                direction="up"
                                                                loop="infinite"
                                                                scrolldelay="150"
                                                                scrollamount="3"
                                                                height="190px"
                                                            >
                                                                <div class="row" :class="index === 0 ? 'mt-1' : 'mt-2'" v-for="(item, index) in realTimeChargeExchange" :key="index">
                                                                    <div class="col">
                                                                        <ul class="ranking-ul">
                                                                            <li>
                                                                                <span>{{ index + 1 }}</span>
                                                                            </li>
                                                                            <li>
                                                                                {{ $moment(item.regDateTime).format('MM/DD HH:mm') }}
                                                                            </li>
                                                                            <li :class="item.type === 'C' ? 'charge' : 'exchange'">
                                                                                {{ $numeral(item.amount).format('0,0') }}
                                                                            </li>
                                                                            <li :class="item.type === 'C' ? 'charge' : 'exchange'">
                                                                                <span>
                                                                                    {{ item.type === 'C' ? '충전' : '환전' }}
                                                                                </span>
                                                                            </li>
                                                                            <li>
                                                                                {{ item.id.substring(0, 2) }}****
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </marquee>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <hr class="mt-5">
            <div class="row my-4">
                <div class="col">
                    <div class="footer">
                        <div class="row">
                            <div class="col-12 col-xl-7">
                                <div class="row">
                                    <div class="col img-meta">
                                        <img src="/images/study.png" class="logo-bottom">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col d-none d-xl-block">
                                        스터디는 국내 최고 수준의 온라인 게임을 제공합니다.<br>
                                        최고의 스포츠 경기, 현지에서 느낄 수 있는 LIVE CASINO, 미니게임, 가상게임등 다양한 온라인 게임을 제공합니다.<br>
                                        스터디는 게임 엔터테이먼트 기업의 선두주자이며 게임 기술과 보안은 국내 최고 수준이라 자부합니다.<br>
                                        고객 중심의 최고의 품질과 최상의 서비스 제공을 약속드리며 소통과 협력등 전문적인 인력을 배치하여 더 나은 서비스를 제공하기 위해 노력합니다.
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-5 mt-4 d-none d-xl-block">
                                <div class="row">
                                    <div class="col-12 services-title">
                                        STUDY SERVICES
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col">
                                                유럽형 스포츠
                                            </div>
                                            <div class="col">
                                                라이브 카지노
                                            </div>
                                            <div class="col">
                                                보글파워볼
                                            </div>
                                            <div class="col">
                                                스피드 사다리
                                            </div>
                                            <div class="col-3 mr-4"></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col">
                                                국내형 스포츠
                                            </div>
                                            <div class="col">
                                                슬롯
                                            </div>
                                            <div class="col">
                                                보글사다리
                                            </div>
                                            <div class="col">
                                                코인 5분 파워볼
                                            </div>
                                            <div class="col-3 mr-4"></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col">
                                                라이브
                                            </div>
                                            <div class="col">
                                                파워볼
                                            </div>
                                            <div class="col">
                                                EOS 5분 파워볼
                                            </div>
                                            <div class="col">
                                                코인 3분 파워볼
                                            </div>
                                            <div class="col-3 mr-4"></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col">
                                                스페셜
                                            </div>
                                            <div class="col">
                                                파워사다리
                                            </div>
                                            <div class="col">
                                                EOS 3분 파워볼
                                            </div>
                                            <div class="col">
                                                구글 5분 파워볼
                                            </div>
                                            <div class="col-3 mr-4"></div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col">
                                                실시간
                                            </div>
                                            <div class="col">
                                                키노사다리
                                            </div>
                                            <div class="col">
                                                EOS 1분 파워볼
                                            </div>
                                            <div class="col">
                                                구글 3분 파워볼
                                            </div>
                                            <div class="col-3 mr-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-5 d-none d-xl-block">
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Home',
        components: {
        },
        computed: {
            ...mapGetters(['user' , 'isLogin'])
        },
        data() {
            return {
                selectBoard: 'notice',
                notice: [],
                event: [],
                faq: [],
                topExchange: [],
                realTimeChargeExchange: [],
                selectCommunication: 0
            }
        },
        created() {
            this.getDashboard()
        },
        methods: {
            async getDashboard() {
                const r = await this.$http.get('/api/get-home', { n: 8 })
                if(r.error) return

                this.notice = r.data.dashboard.notice
                this.event = r.data.dashboard.event
                this.faq = r.data.dashboard.faq
                this.topExchange = r.data.topExchange
                this.realTimeChargeExchange = r.data.realTimeChargeExchange
            },
            async openKplay(id) {
                const kplayWindow = window.open('', 'kplay', '_blank')
                let r = await this.$http.get('/api/kpay-url', { id }, false)

                kplayWindow.location = r.data.launch_url
            },
            changeCommunication(i) {
                this.selectCommunication = i
            },
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-main-banner-bg {
        background: #F9F9F9;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
    .mobile-main-banner {
        width: 100%;
        height: 256px;
        border-radius: 10px;
    }
    .main-banner {
        border-radius: 50 50 50 50;
    }
    .minigame-main-banner {
        @media (min-width: 1200px) {
            padding: 2rem 1.5rem 0 2rem;
        }

        &.second {
            padding: 0 1.5rem 0 2rem;
        }

        .minigame-main-banner-title {
            color: #333333;
            font-size: 0.9375rem;
            font-weight: 700;
            line-height: 30px;

            @media (min-width: 1200px) {
                font-size: 1.25rem;
            }
        }

        .minigame-main-banner-img {

            img {
                max-width: 100%;
                height: auto;
                border-radius: 10px;
                cursor: pointer;
            }
        }
        .minigame-main-banner-game-subtitle {
            margin-top: 5px;
            color: #7a7a7a;
            font-size: 0.625rem;

            @media (min-width: 1200px) {
                font-size: 0.75rem;
            }
        }
        .minigame-main-banner-game-title {
            color: #333;
            font-size: 0.8125rem;

            @media (min-width: 1200px) {
                font-size: 1rem;
            }
        }
        .mobile-mini-game {
            overflow-x: auto;
            white-space: nowrap;
            text-overflow: ellipsis;

            &::-webkit-scrollbar {
                width: 3px; /*스크롤바의 너비*/
                height: 3px; /*스크롤바의 높이*/
            }
            &::-webkit-scrollbar-thumb {
                background-color: inherit; /*스크롤바의 색상*/
            }
            &::-webkit-scrollbar-track {
                background-color: inherit; /*스크롤바 트랙 색상*/
            }
        }
        .mmobile-mini-game-img {


            ul {
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                    display: inline-block;

                    &:not(:first-child) {
                        margin-left: 10px;
                    }

                    img {
                        width: 120px;
                        height: auto;
                        border-radius: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .dashboard-ranking {
        @media (min-width: 1200px) {
            padding: 1.5rem 1.5rem 0 2rem;
        }

        .dashboard-ranking-wrap {
            background-color: #242424;
            border-radius: 20px;
            box-shadow: 15px 15px 15px #ccc;

            @media (min-width: 1200px) {
                width: 1548px;
                height: 347px;
            }


            .ranking-title {
                padding: 0 30px;
                color: #fff;
                font-size: 1.25rem;
                line-height: 60px;
            }

            .ranking-wrap {
                padding-left: 12px;
                background-color: #202020;
                border-radius: 5px;

                @media (min-width: 1200px) {
                    width: 460px;
                    height: 270px;
                    margin-bottom: 20px;
                }
            }

            .ranking-ul {
                position: relative;
                list-style: none;
                color: #fff;
                font-size: 0.75rem;

                li {
                    float: left;
                    text-align: center;
                    &:nth-child(1) {
                        width: 7%;
                        span {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background-color: #e2e2e2;
                            border-radius: 50%;
                            color: #333;
                            font-weight: 700;
                            text-align: center;
                        }
                    }
                    &:nth-child(2) {
                        width: 25%;
                        color: #b4b4b4;
                    }
                    &:nth-child(3) {
                        width: 25%;
                        font-weight: 700;

                        &.charge {
                            color: #fff;
                        }
                        &.exchange {
                            color: #e97272;
                        }
                    }
                    &:nth-child(4) {
                        width: 13%;

                        &.charge {
                            span {
                                width: 80%;
                                display: inline-block;
                                background-color: #1a3a61;
                                color: #fff;
                            }
                        }
                        &.exchange {
                            span {
                                width: 80%;
                                display: inline-block;
                                background-color: #762b2b;
                                color: #fff;
                            }
                        }
                    }
                    &:nth-child(5) {
                        width: 30%;
                    }
                }
            }
        }
    }
    .dashboard-board {
        background-color: #191919;
        border-radius: 10px;
        height: 100%;

        @media (min-width: 1200px) {
            border-radius: 20px;
            height: 97%;
        }

        .dashboard-board-title {
            padding: 5px 5px;
            color: #fff;
            font-size: 0.9375rem;
            line-height: 40px;
            cursor: pointer;

            @media (min-width: 1200px) {
                font-size: 1.25rem;
                line-height: 60px;
                padding: 0 15px;
            }

            .active {
                color: #ccc !important;
            }
            span {
                padding: 0 15px;
            }
        }

        .board-wrap {
            margin-bottom: 20px;
            padding: 5px 10px;
        }

        .board-ul {
            position: relative;
            list-style: none;
            color: #fff;
            font-size: 0.875rem;
            padding-top: 2px;

            @media (min-width: 1200px) {
                font-size: 0.8125rem;
                padding-left: 23px;
            }

            li {
                float: left;
                height: 25px;
                text-align: left;

                &:nth-child(1) {
                    padding-left: 10px;
                    width: 25%;
                }
                &:nth-child(2) {
                    width: 65%;
                    color: #b4b4b4;
                }

                @media (min-width: 1200px) {
                    height: 20px;
                    &:nth-child(1) {
                        padding-left: 0;
                        width: 13%;
                    }
                    &:nth-child(2) {
                        width: 87%;
                        color: #b4b4b4;
                    }
                }
            }
        }
    }
    .footer {
        margin-bottom: 70px;
        font-size: 0.75rem;
        color: #7a7a7a;

        @media (min-width: 1200px) {
            padding: 1.5rem 1.5rem 0 3rem;
        }

        .logo-bottom {
            width: 150px;
        }

        .services-title {
            color: #333;
            font-weight: 900;
        }
        .img-meta {
            text-align: center;

            @media (min-width: 1200px) {
                text-align: left;
            }
        }
    }
        .nrgent-notice {
        margin-top: 8px;
        padding-left: 20px;
        .notice-button {
            width: 50px;
            height: 22px;
            background-color: #0E3B72;
            color: #fff;
            border-radius: 3px;
            font-size: 0.6875rem;
            font-weight: 600;
            line-height: 20px;
            text-align: center;
        }
        .notice {
            color: #333;
            font-size: 0.75rem;
            font-weight: 500;
            line-height: 25px;
        }
    }
</style>