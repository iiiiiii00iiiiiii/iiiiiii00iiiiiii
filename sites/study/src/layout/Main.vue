<template>
    <div>
        <div class="header-mobile-layout d-xl-none">
            <Header/>
        </div>
        <div class="left-layout d-none d-xl-block">
            <Left/>
        </div>
        <div class="main-layout">
            <div class="container-fluid">
                <slot/>
            </div>
        </div>
        <div class="d-none">
            <Right/>
        </div>
        <div class="fixed-bottom footer-mobile-layout d-xl-none">
            <FooterMobileMenu/>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Left from '@/components/Left.vue'
    import Right from '@/components/Right.vue'
    import FooterMobileMenu from '@/components/FooterMobileMenu.vue'

export default {
    name: "MainLayout",
    components: {
        Header,
        Left,
        Right,
        FooterMobileMenu
    }
}
</script>