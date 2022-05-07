<template>
    <div class="row mb-3 d-none d-xl-block">
        <div class="col-12">
            <div class="row px-xl-4">
                <div class="col-12">
                    <div class="icon-sports text-center" @click="$emit('selectCategory', '')">
                        <div>
                            <img class="sports-img" src="/images/icon-all.png" title="전체">
                        </div>
                        <div class="mt-1">
                            전체
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Basketball')">
                        <div>
                            <img class="sports-img" src="/images/icon-basketball.png" title="농구">
                        </div>
                        <div class="mt-1">
                            농구
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Volleyball')">
                        <div>
                            <img class="sports-img" src="/images/icon-volleyball.png" title="배구">
                        </div>
                        <div class="mt-1">
                            배구
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavGamesLiveKor'
}
</script>