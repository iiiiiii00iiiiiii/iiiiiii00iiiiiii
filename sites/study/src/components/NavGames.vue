<template>
    <div class="row mb-2 d-none d-xl-block">
        <div class="col-12 bg-title-wrap">
            <div class="row p-2">
                <div class="col-12">
                    <div class="icon-sports text-center" @click="$emit('selectCategory', '')">
                        <div>
                            <img class="sports-img" src="/images/icon-all.png" title="전체">
                        </div>
                        <div class="mt-1">
                            전체
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Football')">
                        <div>
                            <img class="sports-img" src="/images/icon-football.png" title="축구">
                        </div>
                        <div class="mt-1">
                            축구
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
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Baseball')">
                        <div>
                            <img class="sports-img" src="/images/icon-baseball.png" title="야구">
                        </div>
                        <div class="mt-1">
                            야구
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
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Ice Hockey')">
                        <div>
                            <img class="sports-img" src="/images/icon-icehockey.png" title="아이스하키">
                        </div>
                        <div class="mt-1">
                            아이스하키
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Tennis')">
                        <div>
                            <img class="sports-img" src="/images/icon-tennis.png" title="테니스">
                        </div>
                        <div class="mt-1">
                            테니스
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Table Tennis')">
                        <div>
                            <img class="sports-img" src="/images/icon-tabletennis.png" title="탁구">
                        </div>
                        <div class="mt-1">
                            탁구
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Darts')">
                        <div>
                            <img class="sports-img" src="/images/icon-darts.png" title="다트">
                        </div>
                        <div class="mt-1">
                            다트
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Boxing')">
                        <div>
                            <img class="sports-img" src="/images/icon-boxing.png" title="권투">
                        </div>
                        <div class="mt-1">
                            권투
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'MMA')">
                        <div>
                            <img class="sports-img" src="/images/icon-mma.png" title="이종격투기">
                        </div>
                        <div class="mt-1">
                            이종격투기
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Rugby League')">
                        <div>
                            <img class="sports-img" src="/images/icon-rugby.png" title="럭비">
                        </div>
                        <div class="mt-1">
                            럭비
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Rugby Union')">
                        <div>
                            <img class="sports-img" src="/images/icon-rugbyunion.png" title="럭비유니온">
                        </div>
                        <div class="mt-1">
                            럭비유니온
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Rugby Usa')">
                        <div>
                            <img class="sports-img" src="/images/icon-rugbyusa.png" title="미식축구">
                        </div>
                        <div class="mt-1">
                            미식축구
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Golf')">
                        <div>
                            <img class="sports-img" src="/images/icon-golf.png" title="골프">
                        </div>
                        <div class="mt-1">
                            골프
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Handball')">
                        <div>
                            <img class="sports-img" src="/images/icon-handball.png" title="핸드볼">
                        </div>
                        <div class="mt-1">
                            핸드볼
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'CS:GO')">
                        <div>
                            <img class="sports-img" src="/images/icon-csgo.png" title="CS:GO">
                        </div>
                        <div class="mt-1">
                            CS:GO
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'Dota 2')">
                        <div>
                            <img class="sports-img" src="/images/icon-dota2.png" title="Dota 2">
                        </div>
                        <div class="mt-1">
                            Dota 2
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'LoL')">
                        <div>
                            <img class="sports-img" src="/images/icon-lol.png" title="LoL">
                        </div>
                        <div class="mt-1">
                            LoL
                        </div>
                    </div>
                    <div class="icon-sports text-center" @click="$emit('selectCategory', 'FIFA')">
                        <div>
                            <img class="sports-img" src="/images/icon-fifa.png" title="FIFA">
                        </div>
                        <div class="mt-1">
                            FIFA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavGames'
}
</script>