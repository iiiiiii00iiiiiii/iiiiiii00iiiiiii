<template>
    <div class="container-fluid">
        <div class="community-category">
            <div class="row">
                <div class="col px-0">
                    <div class="community-category-title">
                        <div class="mt-3">OCEAN CS MENU</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 px-0">
                    <div class="community-category-content">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/notice', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-notice.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                공지사항
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/event', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-event.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                이벤트
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/faq', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-faq.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                자주묻는질문
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/attendance', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-attendance.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                출석부
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/mypage', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-attendance.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                마이페이지
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <div class="row" @click="$tools.pushRouter('/betlist', true)">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-betlist.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                베팅내역
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <!-- <div class="row" @click="$tools.pushRouter('/sportsresult')"> -->
                                    <div class="row" @click="$tools.ready('/sportsresult')">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-result.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                경기결과
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-12">
                                <div class="community-bg">
                                    <!-- <div class="row" @click="$tools.pushRouter('/frienddetails')"> -->
                                    <div class="row" @click="$tools.ready('/frienddetails')">
                                        <div class="col-3">
                                            <div class="community-category-icon">
                                                <img src="/images/icon-cs-partner.png">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="community-category-sub-title">
                                                지인추천현황
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <div class="community-category-dot">
                                                <img src="/images/icon-dot-white.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col px-0">
                    <div class="community-category-bottom"></div>
                </div>
            </div>
        </div>
    </div>
</template>