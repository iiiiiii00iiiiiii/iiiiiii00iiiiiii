<template>
    <div>
        <div class="mt-2">
            <div class="row">
                <div class="col-12 page-title">
                    <div>
                        <font-awesome-icon :icon="['fa', 'sign-in-alt']"/> 회원가입 완료 MEMBER JOIN
                    </div>
                </div>
                <div class="col-12 page-content">
                    <div class="row">
                        <div class="col-12 col-lg-6 offset-lg-3 py-4">
                            <div class="welcome-box">
                                <div class="title">
                                    <font-awesome-icon class="text-info" :icon="['fa', 'cog']"/> MEMBER JOIN
                                </div>
                                <div class="mt-3 text-white">
                                    가입해 주셔서 감사합니다.<br>
                                    잠시 후 담당자가 승인 전화를 드릴 것입니다.<br><br>
                                    가입 승인 후 정상 이용 가능합니다.<br>
                                    <button
                                        type="submit"
                                        class="btn btn-sm btn-primary font-weight-bold mt-3"
                                        @click="$tools.routerPush('/login')"
                                    >
                                        <font-awesome-icon :icon="['fa', 'sign-in-alt']"/> 로그인
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Welcome'
}
</script>
<style lang="scss" scoped>
    .welcome-box {
        background-color: rgba(0, 0, 0, 0.4);
        padding: 1rem;
        border: 1px solid #323232;

        .title {
            font-weight: 600;
            font-size: 1.75rem;
            color: #ffffff;
        }
    }
</style>