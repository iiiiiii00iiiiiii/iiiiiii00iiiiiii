<template>
    <div class="mb-30px">
        <div class="mt-1 text-center">
            <img src="/images/banner-left-event.jpg" class="img-fluid cursor-pointer" alt="이벤트" title="이벤트" @click="$tools.pushRouter('/event', true)">
        </div>
        <div class="mt-1 text-center">
            <img src="/images/banner-left-notice.png" class="img-fluid cursor-pointer" alt="공지사항" title="공지사항" @click="$tools.pushRouter('/notice', true)">
        </div>
        <div class="mt-1 text-center">
            <img src="/images/banner-left-help.jpg" class="img-fluid cursor-pointer" alt="고객센터" title="고객센터" @click="$tools.pushRouter('/help', true)">
        </div>
        <div class="mt-1 text-center">
            <img src="/images/banner-left-attendance.jpg" class="img-fluid cursor-pointer" alt="출석체크" title="출석체크" @click="$tools.pushRouter('/attendance', true)">
        </div>
    </div>
</template>