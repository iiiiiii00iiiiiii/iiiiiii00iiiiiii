<template>
    <div class="mb-30px">
        <!-- <div class="mt-1 text-center">
            <img src="/images/banner-right-telegram.jpg" class="img-fluid cursor-pointer" alt="텔레그램" title="텔레그램">
        </div> -->

        <div class="mt-1 text-center">
            <img src="/images/banner-right-powerball.png" class="img-fluid cursor-pointer" alt="파워볼" title="파워볼" @click="$tools.pushRouter('/powerball')">
        </div>
        <div class="mt-1 text-center">
            <img src="/images/banner-right-domain.gif" class="img-fluid cursor-pointer" alt="평생주소" title="평생주소" @click="$tools.openNewTab('https://www.펜트홈.com')">
        </div>
        <!-- <div class="mt-1 text-center">
            <img src="/images/banner-right-telegram.png" class="img-fluid cursor-pointer" alt="텔레그램" title="텔레그램">
        </div> -->
    </div>
</template>