const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const KEY_PLAYER = 'config';
const listSong = $('.list-song');
const songName = $('.player h2');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const audio = $('.audio');
const play = $('.play');
const next = $('.next');
const prev = $('.prev');
const random = $('.random');
const repeat = $('.repeat');
const progress = $('#progress');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(KEY_PLAYER)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(KEY_PLAYER, JSON.stringify(this.config))
    },
    songs: [{
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
            name: 'Light It Up',
            singer: 'Robin Hustin x TobiMorrow',
            path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
            image: './assets/img/hien.jpg',
        },
        {
            name: 'Yoru ni kakeru',
            singer: 'YOASOBI',
            path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
            image: './assets/img/hien.jpg',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: './assets/img/hien.jpg',
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },

        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
    ],
    renderSong: function() {
        const htmlS = this.songs.map((song, index) => {
            return `
            <div class="song-item" data-index="${index}">
                <div class="song-info">
                    <div class="song-img" style="background-image: url('${song.image}');"></div>
                    <div class="song-content">
                        <h2>${song.name}</h2>
                        <p>${song.singer}</p>
                    </div>
                </div>
                <i class="option fas fa-ellipsis-h"></i>
             </div>
            `
        })
        listSong.innerHTML = htmlS.join('');
    },
    handEvent() {
        _this = this;
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollSong = window.scrollY || document.documentElement.scrollTop;
            const newWidth = (cdWidth - scrollSong > 0) ? cdWidth - scrollSong : 0;
            cd.style.width = newWidth + 'px';
            cd.style.opacity = newWidth / cdWidth;
        };
        //xu ly cd quay
        const cdAnimate = cd.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 4000,
            iterations: Infinity
        });
        cdAnimate.pause();
        //click play
        play.onclick = function() {
            _this.isPlaying = !_this.isPlaying;
            if (_this.isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        };
        //khi nhac dang play/pause
        audio.onplay = function() {
            play.classList.add('playing');
            cdAnimate.play();
        };
        audio.onpause = function() {
            play.classList.remove('playing');
            cdAnimate.pause();
        };
        //thay doi progress value khi nhac dang phat
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const songPercent = (audio.currentTime / audio.duration * 100);
                progress.value = songPercent;
            }
        };
        //seek song
        progress.oninput = function() {
            seekTime = progress.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        };
        //khi click next
        next.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            _this.loadCurrentSong();
            audio.play();
            _this.autoView();
        };
        //khi click prev
        prev.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            _this.loadCurrentSong();
            audio.play();
            _this.autoView();
        };
        //khi click random
        random.onclick = function() {
            _this.isRandom = !_this.isRandom;
            random.classList.toggle('active', _this.isRandom);
            _this.randomSong();
            _this.setConfig('isRandom', _this.isRandom);
        };
        //khi click repeat
        repeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeat.classList.toggle('active', _this.isRepeat)
            _this.setConfig('isRepeat', _this.isRepeat);
        };
        //khi het bai
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else(
                _this.nextSong(),
                _this.loadCurrentSong(),
                audio.play()
            )
            _this.autoView();
        };
        //khi click vao list song
        listSong.onclick = function(e) {
            const userSelect = e.target.closest('.song-item:not(.active)') || e.target.closest('.option');
            if (e.target.closest('.song-item:not(.active)')) {
                _this.currentIndex = Number(userSelect.dataset.index);
                _this.loadCurrentSong();
                audio.play();
                _this.autoView();
            }
            if (e.target.closest('.option')) {
                console.log("option")
            }
        }
    },
    nextSong: function() {
        this.currentIndex++;
        const songLength = this.songs.length - 1;
        if (this.currentIndex > songLength) {
            this.currentIndex = 0;
        }
    },
    prevSong: function() {
        this.currentIndex--;
        const songLength = this.songs.length - 1;
        if (this.currentIndex < 0) {
            this.currentIndex = songLength;
        }
    },
    randomSong: function() {
        const randomIndex = Math.floor(Math.random() * this.songs.length);
        if (randomIndex == this.currentIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = randomIndex;
        }
    },
    autoView: function() {
        const currentSong = $('.song-item.active');
        setTimeout(function() {
            currentSong.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            })
        }, 1000)
    },
    loadCurrentSong: function() {
        const listSongItem = $$('.song-item');
        songName.textContent = this.songs[this.currentIndex].name;
        cdThumb.style.backgroundImage = `url('${this.songs[this.currentIndex].image}')`;

        audio.src = this.songs[this.currentIndex].path;
        const currentIndex = this.currentIndex;
        listSongItem.forEach(function(song) {
            if (Number(song.dataset.index) == currentIndex) {
                song.classList.add('active');
            } else if ((Number(song.dataset.index) !== currentIndex) && (song.classList.contains('active'))) {
                song.classList.remove('active');
            }
        })
    },
    handleConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        random.classList.toggle('active', this.isRandom)
        repeat.classList.toggle('active', this.isRepeat)
    },
    start: function() {
        this.handleConfig();
        this.renderSong();
        this.loadCurrentSong();
        this.handEvent();
    }
}
app.start();