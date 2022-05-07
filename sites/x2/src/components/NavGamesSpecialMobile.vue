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
                                <div class="icon-sports-mobile text-center" @click="$emit('selectCategory', 'Baseball')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-baseball.png" title="야구">
                                    </div>
                                    <div class="mt-1">
                                        야구
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
                            <td>
                                <div class="icon-sports-mobile text-center" 
                                @click="$emit('selectCategory', 'Ice Hockey')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-icehockey.png" title="아이스하키">
                                    </div>
                                    <div class="mt-1">
                                        아이스하키
                                    </div>
                                </div>
                            </td>
                            <!-- <td>
                                <div class="icon-sports-mobile text-center" @click="$emit('selectCategory', 'LoL')">
                                    <div>
                                        <img class="sports-img" src="/images/icon-lol.png" title="LoL">
                                    </div>
                                    <div class="mt-1">
                                        LoL
                                    </div>
                                </div>
                            </td> -->
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavGamesSpecialMobile',
    props: {
        from: {
            type: String
        }
    },
}
</script>