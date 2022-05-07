<template>
    <div class="row mb-2 d-xl-none" :class="from === 'result' ? 'd-xl-block p-2 mt-3' : ''">
        <div class="col-12">
            <div class="col-12 nav-sports">
                <div class="table-responsive">
                    <table class="table-nav-games-mobile">
                        <tr>
                            <td>
                                <div class="icon-sports-mobile text-center" @click="$emit('selectCategory', '')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-all.png" title="전체">
                                    </div>
                                    <div class="mt-1">
                                        전체
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="icon-sports-mobile text-center" @click="$emit('selectCategory', 'Basketball')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-basketball.png" title="농구">
                                    </div>
                                    <div class="mt-1">
                                        농구
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="icon-sports-mobile text-center" @click="$emit('selectCategory', 'Volleyball')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-volleyball.png" title="배구">
                                    </div>
                                    <div class="mt-1">
                                        배구
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavGamesLiveKorMobile',
    props: {
        from: {
            type: String
        }
    },
}
</script>