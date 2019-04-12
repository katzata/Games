//
//
//

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const pi = new Image();
const l1 = new Image();
const en = new Image();
const b1 = new Image();
const credit = new Audio();
const l1m = new Audio();
const engine = new Audio();
pi.src = "img/pi.png"
l1.src = "img/l1.png";
en.src = "img/en.png";
b1.src = "img/b1.png";
credit.src = "audio/credit.ogg";

const level = {
	scoreOffset: 8,
	livesOffset: 8,
	bombOffset: 16,
	creditOffset: 7,
	scrollSpeed: 0.5,
	scrollPos: 550.5,// 1929 // 2321
	powerCount: 0,
	buildungCount: 0,
	buildingInc: 1,
	buildingOffset: 0,
	stationOffset: -139,
	drawingStation: true,
	beamCount: 0,
	hitCounter1: 0,
	hitCounter2: 0,
	hitCounter3: 0,
	hitCounter4: 0,
	hitSpeed: 2,
	explosionCount1: [0, 0, 0],
	explosionCount2: [0, 0, 0],
	explosionCount2v2: [0, 0, 0],
	explosionCount3: [0, 0, 0],
	explosionCount3v2: [0, 0, 0],
	explosionCount4: [0, 0, 0],
	explosionCount5: [0, 0, 0],
	explosionCount6: [0, 0, 0],
	explosionExCount: 0,
	explosion1Coords: [],
	explosion2Coords: [],
	explosion2v2Coords: [],
	explosion3Coords: [],
	explosion3v2Coords: [],
	explosion4Coords: [],
	explosion5Coords: [],
	explosion6Coords: [],
	explosionExCoords: [],
	explosion1: false,
	explosion2: false,
	explosion2v2: false,
	explosion3: false,
	explosion3v2: false,
	explosion4: false,
	explosion5: false,
	explosion6: false,
	explosion7: false,
	explosionEx: false,
	bossExplosionsCount: 0,
	bossExplosionsSequencing: false,
	hitCoords: [0, 0],
	drawBg: function () {
		this.scrollPos -= this.scrollSpeed;
		ctx.drawImage(l1, 0, this.scrollPos, 304, 224, 0, 0, 304, 224);
	},
	drawFg: function () {
		ctx.drawImage(pi, 70, 111, 15, 11, 17, 5, 15, 11);
		
		let scoreTemp = Array.from(player.score.toString().split("").reverse());
				
		for (let x = 0; x < player.score.toString().length; x++) {
			ctx.drawImage(pi, Number(scoreTemp[x]) * this.scoreOffset, 98, 8, 12, 96 - (x * this.scoreOffset), 4, 8, 12);
		}

		for (let x = 0; x < player.lives; x++) {
			ctx.drawImage(pi, 148, 41, 7, 8, 16 + x * this.livesOffset, 17, 7, 8);
		}

		for (let x = 0; x < player.bombs; x++) {
			ctx.drawImage(pi, 137, 41, 10, 15, 19 + x * this.bombOffset, 201, 10, 15);
		}
		
		if (player.credits[1] < 2 && player.credits[0] == 0) {
			ctx.drawImage(pi, 0, 111, 46, 8, 209, 216, 46, 8);
		} else {
			ctx.drawImage(pi, 0, 111, 54, 8, 209, 216, 54, 8);
		}

		for (let x = 0; x < 2; x++) {
			ctx.drawImage(pi, player.credits[0] * this.creditOffset, 120, 6, 8, 273, 216, 6, 8);
			ctx.drawImage(pi, player.credits[1] * this.creditOffset, 120, 6, 8, 281, 216, 6, 8);
		}

		ctx.drawImage(en, 0, 234, 56, 8, 120, 216, 56, 8);
	},
	drawPower: function (x, y) {
		this.powerCount++;
		
		ctx.save();

		if (this.powerCount < 5) {
			ctx.translate(-8, -9);
			ctx.drawImage(pi, 86, 21, 16, 19, x, y, 16, 19);
		} else if (this.powerCount >= 5 && this.powerCount < 10) {
			ctx.translate(-8, -9);
			ctx.drawImage(pi, 103, 21, 16, 19, x, y, 16, 19);
		} else if (this.powerCount >= 10 && this.powerCount < 15) {
			ctx.translate(-8, -9);
			ctx.drawImage(pi, 120, 21, 16, 19, x, y, 16, 19);
		} else if (this.powerCount >= 15 && this.powerCount < 20) {
			ctx.translate(-7, -9);
			ctx.drawImage(pi, 137, 21, 14, 19, x, y, 14, 19);
		} else if (this.powerCount >= 20 && this.powerCount < 25) {
			ctx.translate(-6, -9);
			ctx.drawImage(pi, 152, 21, 12, 19, x, y, 12, 19);
		} else if (this.powerCount >= 25 && this.powerCount < 30) {
			ctx.translate(-7, -9);
			ctx.drawImage(pi, 165, 21, 14, 19, x, y, 14, 19);
		} else if (this.powerCount >= 30 && this.powerCount < 35) {
			ctx.translate(-8, -9);
			ctx.drawImage(pi, 180, 21, 16, 19, x, y, 16, 19);
		} else if (this.powerCount >= 35 && this.powerCount < 40) {
			ctx.translate(-8, -9);
			ctx.drawImage(pi, 197, 21, 16, 19, x, y, 16, 19);
		}

		if (this.powerCount >= 39) {
			this.powerCount = 0;
		}

		ctx.restore();
	},
	drawBuilding: function (x, y) {	
		this.buildingOffset += 0.5;

		ctx.save();

		if (this.buildungCount < 1) {
			ctx.translate(0, 0);
			ctx.drawImage(en, 0, 339, 80, 145, x, y, 80, 145);
		} else if (this.buildungCount >= 1 && this.buildungCount < 8) {
			ctx.translate(0, -1);
			ctx.drawImage(en, 81, 339, 80, 146, x, y, 80, 146);
		} else if (this.buildungCount >= 8 && this.buildungCount < 15) {
			ctx.translate(0, -4);
			ctx.drawImage(en, 162, 339, 80, 149, x, y, 80, 149);
		} else if (this.buildungCount >= 15 && this.buildungCount < 22) {
			ctx.translate(0, -7);
			ctx.drawImage(en, 243, 339, 80, 152, x, y, 80, 152);
		} else if (this.buildungCount >= 22 && this.buildungCount < 29) {
			ctx.translate(0, -11);
			ctx.drawImage(en, 324, 339, 80, 156, x, y, 80, 156);
		} else if (this.buildungCount >= 29 && this.buildungCount < 36) {
			ctx.translate(0, -14);
			ctx.drawImage(en, 405, 339, 80, 159, x, y, 80, 159);
		} else if (this.buildungCount >= 36 && this.buildungCount < 43) {
			ctx.translate(0, -18);
			ctx.drawImage(en, 486, 339, 80, 163, x, y, 80, 163);
		} else if (this.buildungCount >= 43) {
			ctx.translate(0, -47);
			ctx.drawImage(en, 567, 339, 80, 192, x, y, 80, 192);
		}

		ctx.restore();

		if (this.buildungCount == 43) {
			this.buildingInc = 0;
		}
	},
	drawStation: function () {
		if (this.scrollPos <= 688 && this.drawingStation == true) {
			ctx.drawImage(b1, 284, 2571, 216, 139, 44, this.stationOffset, 216, 139);
		}
		 
		if (this.scrollPos <= 689 && this.scrollPos > 550) {
			this.stationOffset += 0.5;
		} else if (this.scrollPos <= 550 && level.drawingStation != false) {
			this.scrollSpeed = 0;
			this.drawBeam(120, 0);
		}

		ctx.restore();
	},
	drawBeam: function (x, y) {
		let beamInc = 1;
		
		if (this.beamCount == 70) {
			beamInc = 0;
		}

		this.beamCount += beamInc;

		ctx.save();

		if (this.beamCount >= 5 && this.beamCount < 8) {
			ctx.drawImage(b1, 0, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 8 && this.beamCount < 11) {
			ctx.drawImage(b1, 65, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 11 && this.beamCount < 14) {
			ctx.drawImage(b1, 130, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 14 && this.beamCount < 17) {
			ctx.drawImage(b1, 195, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 17 && this.beamCount < 20) {
			ctx.drawImage(b1, 260, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 20 && this.beamCount < 23) {
			ctx.drawImage(b1, 325, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 23 && this.beamCount < 26) {
			ctx.drawImage(b1, 390, 0, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 26 && this.beamCount < 29) {
			ctx.drawImage(b1, 0, 49, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 11; i++) {
				ctx.drawImage(b1, 263, 191, 4, 16, x + 30, 48 + (i * 16), 4, 16);
			}
		} else if (this.beamCount >= 29 && this.beamCount < 32) {
			ctx.drawImage(b1, 65, 49, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 11; i++) {
				ctx.drawImage(b1, 268, 191, 8, 16, x + 28, 48 + (i * 16), 8, 16);
			}
		} else if (this.beamCount >= 32 && this.beamCount < 35) {
			ctx.drawImage(b1, 130, 49, 64, 52, x, y, 64, 52);

			for (let i = 0; i <= 11; i++) {
				ctx.drawImage(b1, 277, 191, 26, 16, x + 19, 52 + (i * 16), 26, 16);
			}
		} else if (this.beamCount >= 35 && this.beamCount < 38) {
			ctx.drawImage(b1, 195, 49, 64, 56, x, y, 64, 56);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 304, 191, 36, 16, x + 14, 56 + (i * 16), 36, 16);
			}
		} else if (this.beamCount >= 38 && this.beamCount < 41) {
			ctx.drawImage(b1, 260, 49, 64, 60, x, y, 64, 60);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 341, 191, 40, 16, x + 12, 60 + (i * 16), 40, 16);
			}
		} else if (this.beamCount >= 41 && this.beamCount < 44) {
			ctx.drawImage(b1, 325, 49, 64, 65, x, y, 64, 65);

			for (let i = 0; i <= 9; i++) {
				ctx.drawImage(b1, 382, 191, 42, 16, x + 11, 65 + (i * 16), 42, 16);
			}
		} else if (this.beamCount >= 44 && this.beamCount < 47) {
			ctx.drawImage(b1, 390, 49, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 425, 191, 44, 16, x + 10, 48 + (i * 16), 44, 16);
			}
		} else if (this.beamCount >= 47 && this.beamCount < 50) {
			ctx.drawImage(b1, 0, 115, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 425, 191, 42, 16, x + 11, 48 + (i * 16), 42, 16);
			}
		} else if (this.beamCount >= 50 && this.beamCount < 53) {
			ctx.drawImage(b1, 65, 115, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 277, 191, 26, 16, x + 19, 48 + (i * 16), 26, 16);
			}
		} else if (this.beamCount >= 53 && this.beamCount < 56) {
			ctx.drawImage(b1, 130, 115, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 268, 191, 8, 16, x + 28, 48 + (i * 16), 8, 16);
			}
		} else if (this.beamCount >= 56 && this.beamCount < 59) {
			ctx.drawImage(b1, 195, 115, 64, 48, x, y, 64, 48);

			for (let i = 0; i <= 10; i++) {
				ctx.drawImage(b1, 260, 191, 2, 16, x + 31, 48 + (i * 16), 2, 16);
			}
		} else if (this.beamCount >= 59 && this.beamCount < 64) {
			ctx.drawImage(b1, 260, 115, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 64 && this.beamCount < 65) {
			ctx.drawImage(b1, 325, 115, 64, 48, x, y, 64, 48);				// boss enter
			enemies.bossEnterDone = false;
		} else if (this.beamCount >= 65 && this.beamCount < 68) {
			ctx.drawImage(b1, 390, 115, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 68 && this.beamCount < 71) {
			ctx.drawImage(b1, 0, 164, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 71 && this.beamCount < 74) {
			ctx.drawImage(b1, 65, 164, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 74 && this.beamCount < 77) {
			ctx.drawImage(b1, 130, 164, 64, 48, x, y, 64, 48);
		} else if (this.beamCount >= 77) {
			ctx.drawImage(b1, 195, 164, 64, 48, x, y, 64, 48);
		}

		/*if (this.beamCount == 70) {
			this.beamCount = 0;
		}*/

		ctx.restore();
	},
	drawFlashExplosion: function (x, y) {
		ctx.drawImage(en, 217, 1915, 27, 28, x, y, 27, 28);
	},
	drawExplosion1: function (x, y, index) {
		this.explosionCount1[index]++;
		
		ctx.save();

		if (this.explosionCount1[index] < 4) {
			ctx.translate(-13, -11);
			ctx.drawImage(en, 0, 251, 25, 22, x, y, 25, 22);
		} else if (this.explosionCount1[index] >= 4 && this.explosionCount1[index] < 7) {
			ctx.translate(-13, -17);
			ctx.drawImage(en, 26, 251, 25, 28, x, y, 25, 28);
		} else if (this.explosionCount1[index] >= 7 && this.explosionCount1[index] < 10) {
			ctx.translate(-14, -20);
			ctx.drawImage(en, 52, 251, 26, 31, x, y, 25, 31);
		} else if (this.explosionCount1[index] >= 10 && this.explosionCount1[index] < 13) {
			ctx.translate(-17, -24);
			ctx.drawImage(en, 79, 251, 31, 35, x, y, 31, 35);
		} else if (this.explosionCount1[index] >= 13 && this.explosionCount1[index] < 16) {
			ctx.translate(-18, -27);
			ctx.drawImage(en, 111, 251, 32, 38, x, y, 32, 38);
		} else if (this.explosionCount1[index] >= 16 && this.explosionCount1[index] < 19) {
			ctx.translate(-18, -30);
			ctx.drawImage(en, 144, 251, 32, 41, x, y, 32, 41);
		} else if (this.explosionCount1[index] >= 19 && this.explosionCount1[index] < 22) {
			ctx.translate(-17, -29);
			ctx.drawImage(en, 178, 251, 31, 40, x, y, 31, 40);
		} else if (this.explosionCount1[index] >= 22 && this.explosionCount1[index] < 25) {
			ctx.translate(-17, -32);
			ctx.drawImage(en, 210, 251, 31, 43, x, y, 31, 43);
		} else if (this.explosionCount1[index] >= 25 && this.explosionCount1[index] < 28) {
			ctx.translate(-16, -32);
			ctx.drawImage(en, 242, 251, 29, 43, x, y, 29, 43);
		} else if (this.explosionCount1[index] >= 28 && this.explosionCount1[index] < 31) {
			ctx.translate(-16, -32);
			ctx.drawImage(en, 272, 251, 28, 43, x, y, 28, 43);
		} else if (this.explosionCount1[index] >= 31 && this.explosionCount1[index] < 34) {
			ctx.translate(-16, -34);
			ctx.drawImage(en, 301, 251, 26, 45, x, y, 26, 45);
		} else if (this.explosionCount1[index] >= 34) {
			ctx.translate(-14, -34);
			ctx.drawImage(en, 328, 251, 20, 45, x, y, 20, 45);
		}

		ctx.restore();

		if (this.explosionCount1[index] == 37) {
			this.explosionCount1[index] = 0;
			this.explosion1 = false;
			level.explosion1Coords.shift();
		}
	},
	drawExplosion2: function (x, y, index) {
		this.explosionCount2[index]++;

		ctx.save();
		if (this.explosionCount2[index] < 1) {
			ctx.translate(-10, -12);
			ctx.drawImage(en, 0, 504, 20, 24, x, y, 20, 24);
		} else if (this.explosionCount2[index] >= 1 && this.explosionCount2[index] < 4) {
			ctx.translate(-12, -15);
			ctx.drawImage(en, 21, 504, 23, 29, x, y, 23, 29);
		} else if (this.explosionCount2[index] >= 4 && this.explosionCount2[index] < 7) {
			ctx.translate(-14, -17);
			ctx.drawImage(en, 45, 504, 29, 34, x, y, 29, 34);
		} else if (this.explosionCount2[index] >= 7 && this.explosionCount2[index] < 10) {
			ctx.translate(-15, -18);
			ctx.drawImage(en, 75, 504, 31, 35, x, y, 31, 35);
		} else if (this.explosionCount2[index] >= 10 && this.explosionCount2[index] < 13) {
			ctx.translate(-16, -18);
			ctx.drawImage(en, 107, 504, 32, 36, x, y, 32, 36);
		} else if (this.explosionCount2[index] >= 13 && this.explosionCount2[index] < 16) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 140, 504, 32, 37, x, y, 32, 37);
		} else if (this.explosionCount2[index] >= 16 && this.explosionCount2[index] < 19) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 173, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCount2[index] >= 19 && this.explosionCount2[index] < 22) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 206, 504, 32, 37, x, y, 32, 37);
		} else if (this.explosionCount2[index] >= 22 && this.explosionCount2[index] < 25) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 239, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCount2[index] >= 25 && this.explosionCount2[index] < 28) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 272, 504, 32, 39, x, y, 32, 39);
		} else if (this.explosionCount2[index] >= 28 && this.explosionCount2[index] < 31) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 305, 504, 32, 40, x, y, 32, 40);
		} else if (this.explosionCount2[index] >= 31 && this.explosionCount2[index] < 34) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 338, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCount2[index] >= 34 && this.explosionCount2[index] < 37) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 371, 504, 32, 36, x, y, 32, 36);
		} else if (this.explosionCount2[index] >= 37 && this.explosionCount2[index] < 40) {
			ctx.translate(-16, -15);
			ctx.drawImage(en, 404, 504, 32, 29, x, y, 32, 29);
		} else if (this.explosionCount2[index] >= 40 && this.explosionCount2[index] < 43) {
			ctx.translate(-15, -16);
			ctx.drawImage(en, 437, 504, 30, 31, x, y, 30, 31);
		} else if (this.explosionCount2[index] >= 43 && this.explosionCount2[index] < 46) {
			ctx.translate(-12, -11);
			ctx.drawImage(en, 468, 504, 24, 22, x, y, 24, 22);
		}

		ctx.restore();
		
		if (this.explosionCount2[index] == 45) {
			this.explosionCount2[index] = 0;
			this.explosion2 = false;
			//this.explosion2Coords.shift();
			this.explosion2Coords.splice(this.explosion2Coords[index])
		}
	},
	drawExplosion2v2: function (x, y, index) {
		this.explosionCount2v2[index]++;

		ctx.save();

		switch (this.explosionCount2v2[index]) {
			case 1:
				ctx.translate(-10, -12);
				ctx.drawImage(en, 0, 504, 20, 24, x, y, 20, 24);
			break;

			case 3:
				ctx.translate(-12, -15);
				ctx.drawImage(en, 21, 504, 23, 29, x, y, 23, 29);
			break;

			case 5:
				ctx.translate(-12, -15);
				ctx.drawImage(en, 21, 504, 23, 29, x, y, 23, 29);
			break;

			case 7:
				ctx.translate(-14, -17);
				ctx.drawImage(en, 45, 504, 29, 34, x, y, 29, 34);
			break;

			case 9:
				ctx.translate(-15, -18);
				ctx.drawImage(en, 75, 504, 31, 35, x, y, 31, 35);
			break;

			case 11:
				ctx.translate(-15, -18);
				ctx.drawImage(en, 75, 504, 31, 35, x, y, 31, 35);
			break;

			case 13:
				ctx.translate(-16, -18);
				ctx.drawImage(en, 107, 504, 32, 36, x, y, 32, 36);
			break;

			case 15:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 140, 504, 32, 37, x, y, 32, 37);
			break;

			case 17:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 140, 504, 32, 37, x, y, 32, 37);
			break;

			case 19:
				ctx.translate(-16, -20);
				ctx.drawImage(en, 173, 504, 32, 38, x, y, 32, 38);
			break;

			case 21:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 206, 504, 32, 37, x, y, 32, 37);
			break;

			case 23:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 206, 504, 32, 37, x, y, 32, 37);
			break;

			case 25:
				ctx.translate(-16, -20);
				ctx.drawImage(en, 239, 504, 32, 38, x, y, 32, 38);
			break;

			case 27:
				ctx.translate(-16, -21);
				ctx.drawImage(en, 272, 504, 32, 39, x, y, 32, 39);
			break;

			case 29:
				ctx.translate(-16, -21);
				ctx.drawImage(en, 272, 504, 32, 39, x, y, 32, 39);
			break;

			case 31:
				ctx.translate(-16, -21);
				ctx.drawImage(en, 305, 504, 32, 40, x, y, 32, 40);
			break;

			case 33:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 338, 504, 32, 38, x, y, 32, 38);
			break;

			case 35:
				ctx.translate(-16, -19);
				ctx.drawImage(en, 338, 504, 32, 38, x, y, 32, 38);
			break;

			case 37:
				ctx.translate(-16, -20);
				ctx.drawImage(en, 371, 504, 32, 36, x, y, 32, 36);
			break;

			case 39:
				ctx.translate(-16, -15);
				ctx.drawImage(en, 404, 504, 32, 29, x, y, 32, 29);
			break;

			case 41:
				ctx.translate(-15, -16);
				ctx.drawImage(en, 437, 504, 30, 31, x, y, 30, 31);
			break;

			case 43:
				ctx.translate(-12, -11);
				ctx.drawImage(en, 468, 504, 24, 22, x, y, 24, 22);
			break;

			case 45:
				ctx.translate(-12, -11);
				ctx.drawImage(en, 468, 504, 24, 22, x, y, 24, 22);
			break;

			case 46:
				this.explosionCount2v2[index] = 0;
				this.explosion2v2 = false;
				this.explosion2v2Coords.shift();
			break;
		}

		ctx.restore();
	},
	drawExplosion3: function (x, y, index) {
		this.explosionCount3[index]++;

		ctx.save();
		if (this.explosionCount3[index] < 4) {
			ctx.translate(-14, -14);
			ctx.drawImage(en, 0, 297, 27, 27, x, y, 27, 27);
		} else if (this.explosionCount3[index] >= 4 && this.explosionCount3[index] < 7) {
			ctx.translate(-15, -16);
			ctx.drawImage(en, 28, 297, 29, 31, x, y, 29, 31);
		} else if (this.explosionCount3[index] >= 7 && this.explosionCount3[index] < 10) {
			ctx.translate(-15, -17);
			ctx.drawImage(en, 58, 297, 30, 34, x, y, 30, 34);
		} else if (this.explosionCount3[index] >= 10 && this.explosionCount3[index] < 13) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 89, 297, 32, 37, x, y, 32, 37);
		} else if (this.explosionCount3[index] >= 13 && this.explosionCount3[index] < 16) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 122, 297, 32, 41, x, y, 32, 41);
		} else if (this.explosionCount3[index] >= 16 && this.explosionCount3[index] < 19) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 155, 297, 32, 40, x, y, 32, 40);
		} else if (this.explosionCount3[index] >= 19 && this.explosionCount3[index] < 22) {
			ctx.translate(-16, -22);
			ctx.drawImage(en, 188, 297, 32, 41, x, y, 32, 41);
		} else if (this.explosionCount3[index] >= 22 && this.explosionCount3[index] < 25) {
			ctx.translate(-15, -22);
			ctx.drawImage(en, 221, 297, 31, 41, x, y, 31, 41);
		} else if (this.explosionCount3[index] >= 25 && this.explosionCount3[index] < 28) {
			ctx.translate(-14, -20);
			ctx.drawImage(en, 253, 297, 29, 40, x, y, 29, 40);
		} else if (this.explosionCount3[index] >= 28 && this.explosionCount3[index] < 31) {
			ctx.translate(-12, -18);
			ctx.drawImage(en, 283, 297, 25, 35, x, y, 25, 35);
		} else if (this.explosionCount3[index] >= 31 && this.explosionCount3[index] < 34) {
			ctx.translate(-10, -15);
			ctx.drawImage(en, 309, 297, 20, 30, x, y, 20, 30);
		} else if (this.explosionCount3[index] >= 34 && this.explosionCount3[index] < 37) {
			ctx.translate(-10, -15);
			ctx.drawImage(en, 330, 297, 20, 29, x, y, 20, 29);
		} else if (this.explosionCount3[index] >= 37) {
			ctx.translate(-8, -13);
			ctx.drawImage(en, 351, 297, 16, 27, x, y, 16, 27);
		}

		if (this.explosionCount3[index] == 40) {
			this.explosionCount3[index] = 0;
			this.explosion3 = false;
			this.explosion3Coords.shift();
		}

		ctx.restore();
	},
	drawExplosion3v2: function (x, y, index) {
		this.explosionCount3v2[index]++;

		ctx.save();

		switch (this.explosionCount3v2[index]) {
			case 1:
				ctx.translate(-14, -14);
				ctx.drawImage(en, 0, 297, 27, 27, x, y, 27, 27);
			break;

			case 3:
				ctx.translate(-15, -16);
				ctx.drawImage(en, 28, 297, 29, 31, x, y, 29, 31);
			break;

			case 5:
				ctx.translate(-15, -16);
				ctx.drawImage(en, 28, 297, 29, 31, x, y, 29, 31);
			break;

			case 7:
				ctx.translate(-15, -17);
				ctx.drawImage(en, 58, 297, 30, 34, x, y, 30, 34);
			break;

			case 9:
				ctx.translate(-15, -17);
				ctx.drawImage(en, 58, 297, 30, 34, x, y, 30, 34);
			break;

			case 11:
				ctx.translate(-16, -21);
				ctx.drawImage(en, 122, 297, 32, 41, x, y, 32, 41);
			break;

			case 13:
				ctx.translate(-16, -20);
				ctx.drawImage(en, 155, 297, 32, 40, x, y, 32, 40);
			break;

			case 15:
				ctx.translate(-16, -20);
				ctx.drawImage(en, 155, 297, 32, 40, x, y, 32, 40);
			break;

			case 17:
				ctx.translate(-16, -22);
				ctx.drawImage(en, 188, 297, 32, 41, x, y, 32, 41);
			break;

			case 19:
				ctx.translate(-15, -22);
				ctx.drawImage(en, 221, 297, 31, 41, x, y, 31, 41);
			break;

			case 21:
				ctx.translate(-15, -22);
				ctx.drawImage(en, 221, 297, 31, 41, x, y, 31, 41);
			break;

			case 23:
				ctx.translate(-14, -20);
				ctx.drawImage(en, 253, 297, 29, 40, x, y, 29, 40);
			break;

			case 25:
				ctx.translate(-12, -18);
				ctx.drawImage(en, 283, 297, 25, 35, x, y, 25, 35);
			break;

			case 27:
				ctx.translate(-12, -18);
				ctx.drawImage(en, 283, 297, 25, 35, x, y, 25, 35);
			break;

			case 29:
				ctx.translate(-10, -15);
				ctx.drawImage(en, 309, 297, 20, 30, x, y, 20, 30);
			break;

			case 31:
				ctx.translate(-10, -15);
				ctx.drawImage(en, 330, 297, 20, 29, x, y, 20, 29);
			break;

			case 33:
				ctx.translate(-10, -15);
				ctx.drawImage(en, 330, 297, 20, 29, x, y, 20, 29);
			break;

			case 35:
				ctx.translate(-8, -13);
				ctx.drawImage(en, 351, 297, 16, 27, x, y, 16, 27);
			break;

			case 36:
				this.explosionCount3v2[index] = 0;
				this.explosion3v2 = false;
				this.explosion3Coords.shift();
			break;
		}

		ctx.restore();
	},
	drawExplosion4: function (x, y, index) {
		this.explosionCount4[index]++;

		ctx.save();

		switch (this.explosionCount4[index]) {
			case 1:
				ctx.translate(-16, -21);
				ctx.drawImage(pi, 0, 594, 32, 43, x, y, 32, 43);
			break;

			case 3:
				ctx.translate(-21, -24);
				ctx.drawImage(pi, 75, 630, 42, 48, x, y, 42, 48);
			break;

			case 5:
				ctx.translate(-24, -28);
				ctx.drawImage(pi, 330, 625, 48, 57, x, y, 48, 57);
			break;

			case 7:
				ctx.translate(-24, -28);
				ctx.drawImage(pi, 330, 625, 48, 57, x, y, 48, 57);
			break;

			case 9:
				ctx.translate(-25, -30);
				ctx.drawImage(pi, 38, 752, 50, 61, x, y, 50, 61);
			break;

			case 11:
				ctx.translate(-25, -30);
				ctx.drawImage(pi, 38, 752, 50, 61, x, y, 50, 61);
			break;

			case 13:
				ctx.translate(-26, -32);
				ctx.drawImage(pi, 127, 723, 53, 64, x, y, 53, 64);
			break;

			case 15:
				ctx.translate(-26, -32);
				ctx.drawImage(pi, 127, 723, 53, 64, x, y, 53, 64);
			break;

			case 17:
				ctx.translate(-27, -32);
				ctx.drawImage(pi, 181, 723, 55, 64, x, y, 55, 64);
			break;

			case 19:
				ctx.translate(-27, -32);
				ctx.drawImage(pi, 181, 723, 55, 64, x, y, 55, 64);
			break;

			case 21:
				ctx.translate(-29, -34);
				ctx.drawImage(pi, 237, 723, 59, 68, x, y, 59, 68);
			break;

			case 23:
				ctx.translate(-29, -34);
				ctx.drawImage(pi, 237, 723, 59, 68, x, y, 59, 68);
			break;

			case 25:
				ctx.translate(-30, -36);
				ctx.drawImage(pi, 296, 723, 61, 72, x, y, 61, 72);
			break;

			case 27:
				ctx.translate(-30, -36);
				ctx.drawImage(pi, 296, 723, 61, 72, x, y, 61, 72);
			break;

			case 29:
				ctx.translate(-30, -36);
				ctx.drawImage(pi, 358, 723, 61, 72, x, y, 61, 72);
			break;

			case 31:
				ctx.translate(-30, -36);
				ctx.drawImage(pi, 358, 723, 61, 72, x, y, 61, 72);
			break;

			case 33:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 420, 723, 62, 72, x, y, 62, 72);
			break;

			case 35:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 420, 723, 62, 72, x, y, 62, 72);
			break;

			case 37:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 127, 796, 62, 72, x, y, 62, 72);
			break;

			case 39:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 127, 796, 62, 72, x, y, 62, 72);
			break;

			case 41:
				ctx.translate(-32, -36);
				ctx.drawImage(pi, 190, 796, 64, 72, x, y, 64, 72);
			break;

			case 43:
				ctx.translate(-32, -36);
				ctx.drawImage(pi, 190, 796, 64, 72, x, y, 64, 72);
			break;

			case 45:
				ctx.translate(-32, -36);
				ctx.drawImage(pi, 255, 796, 65, 72, x, y, 65, 72);
			break;

			case 47:
				ctx.translate(-32, -36);
				ctx.drawImage(pi, 255, 796, 65, 72, x, y, 65, 72);
			break;

			case 49:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 321, 796, 62, 72, x, y, 62, 72);
			break;

			case 51:
				ctx.translate(-31, -36);
				ctx.drawImage(pi, 321, 796, 62, 72, x, y, 62, 72);
			break;

			case 53:
				ctx.translate(-29, -36);
				ctx.drawImage(pi, 384, 796, 59, 72, x, y, 59, 72);
			break;

			case 55:
				ctx.translate(-29, -36);
				ctx.drawImage(pi, 384, 796, 59, 72, x, y, 59, 72);
			break;

			case 57:
				ctx.translate(-29, -36);
				ctx.drawImage(pi, 444, 796, 55, 72, x, y, 55, 72);
			break;

			case 59:
				ctx.translate(-29, -36);
				ctx.drawImage(pi, 444, 796, 55, 72, x, y, 55, 72);
			break;
		}

		if (this.explosionCount4[index] == 60) {
			this.explosionCount4[index] = 0;
			this.explosion4 = false;
			this.explosion4Coords.shift();
		}

		ctx.restore();
	},
	drawExplosion5: function (x, y, index) {
		this.explosionCount5[index]++;

		ctx.save();

		switch (this.explosionCount5[index]) {
			case 1:
				ctx.translate(-20, -20);
				ctx.drawImage(en, 0, 1726, 41, 41, x, y, 41, 41);
			break;

			case 3:
				ctx.translate(-22, -21);
				ctx.drawImage(en, 0, 1768, 45, 42, x, y, 45, 42);
			break;

			case 5:
				ctx.translate(-40, -31);
				ctx.drawImage(en, 0, 1811, 80, 63, x, y, 80, 63);
			break;

			case 7:
				ctx.translate(-40, -31);
				ctx.drawImage(en, 0, 1811, 80, 63, x, y, 80, 63);
			break;

			case 9:
				ctx.translate(-42, -34);
				ctx.drawImage(en, 0, 1875, 84, 68, x, y, 84, 68);
			break;

			case 11:
				ctx.translate(-42, -34);
				ctx.drawImage(en, 0, 1875, 84, 68, x, y, 84, 68);
			break;

			case 13:
				ctx.translate(-43, -36);
				ctx.drawImage(en, 0, 1944, 87, 73, x, y, 87, 73);
			break;

			case 15:
				ctx.translate(-45, -38);
				ctx.drawImage(en, 88, 1944, 91, 76, x, y, 91, 76);
			break;

			case 17:
				ctx.translate(-46, -40);
				ctx.drawImage(en, 180, 1944, 93, 80, x, y, 93, 80);
			break;

			case 19:
				ctx.translate(-46, -40);
				ctx.drawImage(en, 180, 1944, 93, 80, x, y, 93, 80);
			break;

			case 21:
				ctx.translate(-47, -40);
				ctx.drawImage(en, 274, 1944, 94, 80, x, y, 94, 80);
			break;

			case 23:
				ctx.translate(-47, -37);
				ctx.drawImage(en, 369, 1944, 95, 75, x, y, 95, 75);
			break;

			case 25:
				ctx.translate(-47, -37);
				ctx.drawImage(en, 369, 1944, 95, 75, x, y, 95, 75);
			break;

			case 27:
				ctx.translate(-47, -38);
				ctx.drawImage(en, 465, 1944, 95, 77, x, y, 95, 77);
			break;

			case 29:
				ctx.translate(-48, -41);
				ctx.drawImage(en, 0, 2025, 96, 83, x, y, 96, 83);
			break;

			case 31:
				ctx.translate(-48, -41);
				ctx.drawImage(en, 0, 2025, 96, 83, x, y, 96, 83);
			break;

			case 33:
				ctx.translate(-47, -40);
				ctx.drawImage(en, 194, 2025, 95, 80, x, y, 95, 80);
			break;

			case 35:
				ctx.translate(-47, -40);
				ctx.drawImage(en, 194, 2025, 95, 80, x, y, 95, 80);
			break;

			case 37:
				ctx.translate(-48, -41);
				ctx.drawImage(en, 290, 2025, 96, 83, x, y, 96, 83);
			break;

			case 39:
				ctx.translate(-48, -42);
				ctx.drawImage(en, 387, 2025, 96, 84, x, y, 96, 84);
			break;

			case 41:
				ctx.translate(-48, -42);
				ctx.drawImage(en, 387, 2025, 96, 84, x, y, 96, 84);
			break;

			case 43:
				ctx.translate(-48, -42);
				ctx.drawImage(en, 484, 2025, 96, 84, x, y, 96, 84);
			break;

			case 45:
				ctx.translate(-47, -41);
				ctx.drawImage(en, 0, 2025, 95, 85, x, y, 95, 85);
			break;

			case 47:
				ctx.translate(-47, -41);
				ctx.drawImage(en, 0, 2110, 95, 85, x, y, 95, 85);
			break;

			case 49:
				ctx.translate(-48, -43);
				ctx.drawImage(en, 96, 2110, 96, 86, x, y, 96, 86);
			break;

			case 51:
				ctx.translate(-42, -39);
				ctx.drawImage(en, 193, 2110, 85, 79, x, y, 85, 79);
			break;

			case 53:
				ctx.translate(-42, -39);
				ctx.drawImage(en, 193, 2110, 85, 79, x, y, 85, 79);
			break;

			case 55:
				ctx.translate(-44, -40);
				ctx.drawImage(en, 279, 2110, 88, 80, x, y, 88, 80);
			break;

			case 57:
				ctx.translate(-38, -39);
				ctx.drawImage(en, 368, 2110, 76, 79, x, y, 76, 79);
			break;

			case 59:
				ctx.translate(-38, -39);
				ctx.drawImage(en, 368, 2110, 76, 79, x, y, 76, 79);
			break;

			case 61:
				ctx.translate(-34, -35);
				ctx.drawImage(en, 445, 2110, 68, 71, x, y, 68, 71);
			break;
		}

		if (this.explosionCount5[index] == 62) {
			this.explosionCount5[index] = 0;
			this.explosion5 = false;
			this.explosion5Coords.shift();
		}

		ctx.restore();
	},
	drawExplosion6: function (x, y, index) {
		this.explosionCount6[index]++;
		ctx.save();

		if (this.explosionCount6[index] < 4) {
			ctx.translate(-7, -6);
			ctx.drawImage(en, 85, 1915, 14, 13, x, y, 14, 13);
		} else if (this.explosionCount6[index] >= 4 && this.explosionCount6[index] < 8) {
			ctx.translate(-7, -6);
			ctx.drawImage(en, 100, 1915, 14, 13, x, y, 14, 13);
		} else if (this.explosionCount6[index] >= 8 && this.explosionCount6[index] < 12) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 115, 1915, 16, 14, x, y, 16, 14);
		} else if (this.explosionCount6[index] >= 12 && this.explosionCount6[index] < 16) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 132, 1915, 16, 14, x, y, 16, 14);
		} else if (this.explosionCount6[index] >= 16 && this.explosionCount6[index] < 20) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 149, 1915, 16, 15, x, y, 16, 15);
		} else if (this.explosionCount6[index] >= 20 && this.explosionCount6[index] < 24) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 166, 1915, 16, 14, x, y, 16, 14);
		} else if (this.explosionCount6[index] >= 24 && this.explosionCount6[index] < 28) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 183, 1915, 16, 15, x, y, 16, 15);
		} else if (this.explosionCount6[index] >= 28) {
			ctx.translate(-8, -7);
			ctx.drawImage(en, 200, 1915, 16, 15, x, y, 16, 15);
		}

		ctx.restore();

		if (this.explosionCount6[index] == 31) {
			this.explosionCount6[index] = 0;
			this.explosion6 = false;
			this.explosion6Coords.shift();
		}
	},
	drawExplosionEx: function (x, y) {
		this.explosionExCount++;
		
		ctx.save();

		if (this.explosionExCount < 4) {
			ctx.translate(-128, -128);
			ctx.drawImage(en, 391, 1658, 256, 256, x, y, 256, 256);
		} else if (this.explosionExCount >= 4 && this.explosionExCount < 8) {
			ctx.translate(-64, -64);
			ctx.drawImage(en, 132, 1526, 128, 128, x, y, 128, 128);
		} else if (this.explosionExCount >= 8 && this.explosionExCount < 11) {
			ctx.translate(-64, -64);
			ctx.drawImage(en, 261, 1526, 128, 128, x, y, 128, 128);
		} else if (this.explosionExCount >= 11 && this.explosionExCount < 15) {
			ctx.translate(-64, -64);
			ctx.drawImage(en, 132, 1526, 128, 128, x, y, 128, 128);
		} else if (this.explosionExCount >= 15 && this.explosionExCount < 18) {
			ctx.translate(-64, -64);
			ctx.drawImage(en, 261, 1526, 128, 128, x, y, 128, 128);
		} else if (this.explosionExCount >= 18 && this.explosionExCount < 21) {
			ctx.translate(-64, -64);
			ctx.drawImage(en, 390, 1526, 128, 128, x, y, 128, 128);
		} else if (this.explosionExCount >= 21 && this.explosionExCount < 24) {
			ctx.translate(-63, -63);
			ctx.drawImage(en, 520, 1526, 126, 126, x, y, 126, 126);
		}

		ctx.restore();
		
		if (this.explosionExCount == 10) {
			this.explosionExCount = 0;
			this.explosionEx = false;
		}
	},
	bossExplosionsSequence: function () {
		this.bossExplosionsCount++;

		switch (this.bossExplosionsCount) {
			case 1:
				this.explosionExCoords.push([150, 70]);
				this.explosionEx = true;
				this.explosion4Coords.push([40, 156]);
				this.explosion4 = true;
			break;

			case 3:
				this.explosion2Coords.push([153, 100]);
				this.explosion2 = true;
			break;

			case 5:
				this.explosion6Coords.push([150, 182]);
				this.explosion6 = true;
			break;

			case 7:
				this.explosion5Coords.push([282, 212]);
				this.explosion5 = true;
			break;

			case 9:
				this.drawFlashExplosion(99, 108);
			break;

			case 11:
				this.explosion5Coords.push([80, 70]);
				this.explosion5 = true;
			break;

			case 13:
				this.explosion3v2Coords.push([180, 60]);
				this.explosion3v2 = true;
			break;

			case 15:
				this.explosion4Coords.push([210, 30]);
				this.explosion4 = true;
			break;

			case 17:
				this.drawFlashExplosion(200, 108);
			break;

			case 19:
				this.explosion3Coords.push([200, 80]);
				this.explosion3 = true;
			break;

			case 21:
				this.explosion2v2Coords.push([200, 80]);
				this.explosion2v2 = true;
			break;

			case 23:
				this.explosion5Coords.push([90, 40]);
				this.explosion5 = true;
			break;

			case 31:
				this.explosion4Coords.push([190, 140]);
				this.explosion4 = true;
			break;
		}
	},
	drawHit1: function (x, y) {
		this.hitCounter1 += this.hitSpeed;

		ctx.save();

		if (this.hitCounter1 < 2) {
			ctx.translate(-7, -12);
			ctx.drawImage(en, 257, 166, 11, 17, x, y, 11, 17);
		} else if (this.hitCounter1 >= 2 && this.hitCounter1 < 3) {
			ctx.translate(-7, -17);
			ctx.drawImage(en, 269, 166, 12, 21, x, y, 12, 21);
		} else if (this.hitCounter1 >= 3 && this.hitCounter1 < 7) {
			ctx.translate(-8, -21);
			ctx.drawImage(en, 282, 166, 15, 25, x, y, 15, 25);
		} else if (this.hitCounter1 >= 7 && this.hitCounter1 < 11) {
			ctx.translate(-8, -26);
			ctx.drawImage(en, 257, 192, 15, 30, x, y, 15, 30);
		} else if (this.hitCounter1 >= 11 && this.hitCounter1 < 15) {
			ctx.translate(-8, -31);
			ctx.drawImage(en, 273, 192, 15, 35, x, y, 15, 35);
		} else if (this.hitCounter1 >= 15 && this.hitCounter1 < 19) {
			ctx.translate(-7, -25);
			ctx.drawImage(en, 290, 196, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter1 >= 19 && this.hitCounter1 < 23) {
			ctx.translate(-9, -41);
			ctx.drawImage(en, 324, 206, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter1 >= 23 && this.hitCounter1 < 27) {
			ctx.translate(-9, -46);
			ctx.drawImage(en, 356, 206, 16, 50, x, y, 16, 50);
		} else if (this.hitCounter1 >= 27 && this.hitCounter1 < 31) {
			ctx.translate(-9, -44);
			ctx.drawImage(en, 341, 206, 14, 48, x, y, 14, 48);
		} else if (this.hitCounter1 >= 31 && this.hitCounter1 < 35) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 632, 229, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter1 >= 35 && this.hitCounter1 < 39) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 602, 286, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter1 >= 41 && this.hitCounter1 < 45) {
			ctx.translate(-8, -48);
			ctx.drawImage(en, 616, 166, 15, 52, x, y, 15, 52);
		} else if (this.hitCounter1 >= 45) {
			ctx.translate(-8, -46);
			ctx.drawImage(en, 632, 166, 13, 45, x, y, 13, 45);
		}

		ctx.restore();

		if (this.hitCounter1 == 48) {
			this.hitCounter1 = 0;
			player.hitDetected[0] = false;
		}
	},
	drawHit2: function (x, y) {
		this.hitCounter2 += this.hitSpeed;

		ctx.save();

		if (this.hitCounter2 < 2) {
			ctx.translate(-7, -12);
			ctx.drawImage(en, 257, 166, 11, 17, x, y, 11, 17);
		} else if (this.hitCounter2 >= 2 && this.hitCounter2 < 3) {
			ctx.translate(-7, -17);
			ctx.drawImage(en, 269, 166, 12, 21, x, y, 12, 21);
		} else if (this.hitCounter2 >= 3 && this.hitCounter2 < 7) {
			ctx.translate(-8, -21);
			ctx.drawImage(en, 282, 166, 15, 25, x, y, 15, 25);
		} else if (this.hitCounter2 >= 7 && this.hitCounter2 < 11) {
			ctx.translate(-8, -26);
			ctx.drawImage(en, 257, 192, 15, 30, x, y, 15, 30);
		} else if (this.hitCounter2 >= 11 && this.hitCounter2 < 15) {
			ctx.translate(-8, -31);
			ctx.drawImage(en, 273, 192, 15, 35, x, y, 15, 35);
		} else if (this.hitCounter2 >= 15 && this.hitCounter2 < 19) {
			ctx.translate(-7, -25);
			ctx.drawImage(en, 290, 196, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter2 >= 19 && this.hitCounter2 < 23) {
			ctx.translate(-9, -41);
			ctx.drawImage(en, 324, 206, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter2 >= 23 && this.hitCounter2 < 27) {
			ctx.translate(-9, -46);
			ctx.drawImage(en, 356, 206, 16, 50, x, y, 16, 50);
		} else if (this.hitCounter2 >= 27 && this.hitCounter2 < 31) {
			ctx.translate(-9, -44);
			ctx.drawImage(en, 341, 206, 14, 48, x, y, 14, 48);
		} else if (this.hitCounter2 >= 31 && this.hitCounter2 < 35) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 632, 229, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter2 >= 35 && this.hitCounter2 < 39) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 602, 286, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter2 >= 41 && this.hitCounter2 < 45) {
			ctx.translate(-8, -48);
			ctx.drawImage(en, 616, 166, 15, 52, x, y, 15, 52);
		} else if (this.hitCounter2 >= 45) {
			ctx.translate(-8, -46);
			ctx.drawImage(en, 632, 166, 13, 45, x, y, 13, 45);
		}

		ctx.restore();

		if (this.hitCounter2 == 48) {
			this.hitCounter2 = 0;	
			player.hitDetected[1] = false;
		}
	},
	drawHit3: function (x, y) {
		this.hitCounter3 += this.hitSpeed;

		ctx.save();

		if (this.hitCounter3 < 2) {
			ctx.translate(-7, -12);
			ctx.drawImage(en, 257, 166, 11, 17, x, y, 11, 17);
		} else if (this.hitCounter3 >= 2 && this.hitCounter3 < 3) {
			ctx.translate(-7, -17);
			ctx.drawImage(en, 269, 166, 12, 21, x, y, 12, 21);
		} else if (this.hitCounter3 >= 3 && this.hitCounter3 < 7) {
			ctx.translate(-8, -21);
			ctx.drawImage(en, 282, 166, 15, 25, x, y, 15, 25);
		} else if (this.hitCounter3 >= 7 && this.hitCounter3 < 11) {
			ctx.translate(-8, -26);
			ctx.drawImage(en, 257, 192, 15, 30, x, y, 15, 30);
		} else if (this.hitCounter3 >= 11 && this.hitCounter3 < 15) {
			ctx.translate(-8, -31);
			ctx.drawImage(en, 273, 192, 15, 35, x, y, 15, 35);
		} else if (this.hitCounter3 >= 15 && this.hitCounter3 < 19) {
			ctx.translate(-7, -25);
			ctx.drawImage(en, 290, 196, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter3 >= 19 && this.hitCounter3 < 23) {
			ctx.translate(-9, -41);
			ctx.drawImage(en, 324, 206, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter3 >= 23 && this.hitCounter3 < 27) {
			ctx.translate(-9, -46);
			ctx.drawImage(en, 356, 206, 16, 50, x, y, 16, 50);
		} else if (this.hitCounter3 >= 27 && this.hitCounter3 < 31) {
			ctx.translate(-9, -44);
			ctx.drawImage(en, 341, 206, 14, 48, x, y, 14, 48);
		} else if (this.hitCounter3 >= 31 && this.hitCounter3 < 35) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 632, 229, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter3 >= 35 && this.hitCounter3 < 39) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 602, 286, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter3 >= 41 && this.hitCounter3 < 45) {
			ctx.translate(-8, -48);
			ctx.drawImage(en, 616, 166, 15, 52, x, y, 15, 52);
		} else if (this.hitCounter3 >= 45) {
			ctx.translate(-8, -46);
			ctx.drawImage(en, 632, 166, 13, 45, x, y, 13, 45);
		}

		ctx.restore();

		if (this.hitCounter3 == 48) {
			this.hitCounter3 = 0;
			player.hitDetected[2] = false;
		}
	},
	drawHit4: function (x, y) {
		this.hitCounter4 += this.hitSpeed;

		ctx.save();

		if (this.hitCounter4 < 2) {
			ctx.translate(-7, -12);
			ctx.drawImage(en, 257, 166, 11, 17, x, y, 11, 17);
		} else if (this.hitCounter4 >= 2 && this.hitCounter4 < 3) {
			ctx.translate(-7, -17);
			ctx.drawImage(en, 269, 166, 12, 21, x, y, 12, 21);
		} else if (this.hitCounter4 >= 3 && this.hitCounter4 < 7) {
			ctx.translate(-8, -21);
			ctx.drawImage(en, 282, 166, 15, 25, x, y, 15, 25);
		} else if (this.hitCounter4 >= 7 && this.hitCounter4 < 11) {
			ctx.translate(-8, -26);
			ctx.drawImage(en, 257, 192, 15, 30, x, y, 15, 30);
		} else if (this.hitCounter4 >= 11 && this.hitCounter4 < 15) {
			ctx.translate(-8, -31);
			ctx.drawImage(en, 273, 192, 15, 35, x, y, 15, 35);
		} else if (this.hitCounter4 >= 15 && this.hitCounter4 < 19) {
			ctx.translate(-7, -25);
			ctx.drawImage(en, 290, 196, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter4 >= 19 && this.hitCounter4 < 23) {
			ctx.translate(-9, -41);
			ctx.drawImage(en, 324, 206, 16, 45, x, y, 16, 45);
		} else if (this.hitCounter4 >= 23 && this.hitCounter4 < 27) {
			ctx.translate(-9, -46);
			ctx.drawImage(en, 356, 206, 16, 50, x, y, 16, 50);
		} else if (this.hitCounter4 >= 27 && this.hitCounter4 < 31) {
			ctx.translate(-9, -44);
			ctx.drawImage(en, 341, 206, 14, 48, x, y, 14, 48);
		} else if (this.hitCounter4 >= 31 && this.hitCounter4 < 35) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 632, 229, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter4 >= 35 && this.hitCounter4 < 39) {
			ctx.translate(-8, -47);
			ctx.drawImage(en, 602, 286, 15, 51, x, y, 15, 51);
		} else if (this.hitCounter4 >= 41 && this.hitCounter4 < 45) {
			ctx.translate(-8, -48);
			ctx.drawImage(en, 616, 166, 15, 52, x, y, 15, 52);
		} else if (this.hitCounter4 >= 45) {
			ctx.translate(-8, -46);
			ctx.drawImage(en, 632, 166, 13, 45, x, y, 13, 45);
		}

		ctx.restore();

		if (this.hitCounter4 >= 48) {
			this.hitCounter4 = 0;
			player.hitDetected[3] = false;
		}
	},
	patternBuilding: function () {
		if (level.scrollPos <= 1846 && level.scrollPos >= 1420) {
			level.drawBuilding(184, -145 + level.buildingOffset);

			if (level.scrollPos <= 1703) {
				level.buildungCount += level.buildingInc;
			}
		}
	},
	collision: function (x1, y1, w1, h1, dx1, dy1,
						 x2, y2, w2, h2, dx2, dy2) 
	{

		if (player.hitDetected != true) {
			this.hitCoords[0][0] = x1;
			this.hitCoords[0][1] = y1;
		}

		if (x1 + Math.floor(w1 / dx1) > x2 - Math.floor(w2 / dx2) &&
			x1 - Math.floor(w1 / dx1) < x2 + Math.floor(w2 / dx2) &&
			y1 - Math.floor(h1 / dy1) < y2 + Math.floor(h2 / dy2) &&
			y1 + Math.floor(h1 / dy1) > y2 - Math.floor(h2 / dy2)) {

			player.hitDetected = true;
			
			if (controlls.firing1 != false) {
				controlls.firing1 = false;
				controlls.projectilePositionY1 = -5;
			}

			this.drawHit(this.hitCoords[0][0], this.hitCoords[0][1] - 25);
		}
	}
}

const player = {
	x: 140,
	y: 196,
	width: 21,
	height: 31,
	tiltCount: 0,
	projectileSpeed: 8,
	projectileCounter: 0,
	firingSpecial: false,
	specialCount: 0,
	specialMove: 96,
	hitDetected: [
		false, false, false, false,
	],
	power: 2,
	lives: 2,
	bombs: 2,
	credits: [0, 0],
	score: 0,
	transition: false,
	dead: false,
	deathCount: 0,
	thrusters: 0,
	hitCoords: [0, 0],
	draw: function () {
		if (this.dead != true) {
		this.thrusters++;

		ctx.save();

			if (this.specialCount < 150) {
				if (player.tiltCount > -16 && player.tiltCount < 16) {
					
					ctx.translate(-10, -16);

					if (this.thrusters < 5) {
						ctx.drawImage(pi, 32, 0, 21, this.height, this.x, this.y, 21, this.height);
					} else {
						ctx.drawImage(pi, 32, 32, 21, this.height + 1, this.x, this.y, 21, (this.height + 1));
					}
				} else if (player.tiltCount <= -16 && player.tiltCount > -32) {
					
					ctx.translate(-8, -16);
		
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 14, 0, 17, this.height, this.x, this.y, 17, this.height);
					} else {
						ctx.drawImage(pi, 14, 32, 17, this.height + 1, this.x, this.y, 17, (this.height + 1));
					}
				} else if (player.tiltCount <= -32) {
					
					ctx.translate(-6, -16);

					if (this.thrusters < 5) {
						ctx.drawImage(pi, 0, 0, 13, this.height, this.x, this.y, 13, this.height);
					} else {
						ctx.drawImage(pi, 0, 32, 13, this.height + 1, this.x, this.y, 13, (this.height + 1));
					}
				} else if (player.tiltCount >= 16 && player.tiltCount < 32) {
					
					ctx.translate(-8, -16);
		
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 54, 0, 18, this.height, this.x, this.y, 18, this.height);
					} else {
						ctx.drawImage(pi, 54, 32, 18, this.height + 1, this.x, this.y, 18, (this.height + 1));
					}
				} else if (player.tiltCount >= 32) {
					
					ctx.translate(-6, -16);
		
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 71, 0, 14, this.height, this.x, this.y, 14, this.height);
					} else {
						ctx.drawImage(pi, 71, 32, 14, this.height + 1, this.x, this.y, 14, (this.height + 1));
					}
				}
				
				if (this.thrusters == 9) {
					this.thrusters = 0;
				}
			} else {

				if (this.specialCount >= 150 && this.specialCount < 152) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 0, 65, 22, this.height + 1, this.x, this.y, 22, (this.height + 1));
				} else if (this.specialCount >= 152 && this.specialCount < 154) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 23, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 154 && this.specialCount < 156) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 46, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 156 && this.specialCount < 158) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 69, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 158 && this.specialCount < 160) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 92, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 160 && this.specialCount < 162) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 114, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 162 && this.specialCount < 164) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 136, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 164 && this.specialCount < 166) {
					ctx.translate(-10, -16);
					ctx.drawImage(pi, 158, 65, 21, 30, this.x, this.y, 21, 30);
				}
			}

		ctx.restore();

		}
	},
	drawProjectiles: function (x, y, offset, w, index) {
		ctx.save();

		if (this.power == 2) {
			
			if (w == 14) {
				ctx.translate(-7, -16.5);
			}

			if (w == 16) {
				ctx.translate(-8, -16.5);
			}

			if (w == 15) {
				ctx.translate(-7.5, -16.5);
			}

			ctx.drawImage(pi, offset, 102, w, 33, x, y - 10, w, 33);
		} else if (this.power == 3) {
			if (offset < 390) {
				if (w == 14) {
					ctx.translate(-7, -16.5);
				}

				if (w == 16) {
					ctx.translate(-8, -16.5);
				}

				if (w == 15) {
					ctx.translate(-7.5, -16.5);
				}

				ctx.drawImage(pi, offset, 94, w, 41, x - 10, y - 16, w, 41);
			} else {
				if (w == 14) {
					ctx.translate(-7, -16.5);
				}

				if (w == 16) {
					ctx.translate(-8, -16.5);
				}

				if (w == 15) {
					ctx.translate(-7.5, -16.5);
				}

				ctx.drawImage(pi, offset, 94, w, 41, x + 10, y - 16, w, 41);
			}
		} else if (this.power == 4) {
			if (offset < 324) {
				if (w == 14) {
					ctx.translate(-7, -16.5);
				}

				if (w == 16) {
					ctx.translate(-8, -16.5);
				}

				if (w == 15) {
					ctx.translate(-7.5, -16.5);
				}

				ctx.drawImage(pi, offset, 102, w, 33, x, y - 10, w, 33);
			} else if (offset > 324 && offset < 390) {
				if (w == 14) {
					ctx.translate(-7, -16.5);
				}

				if (w == 16) {
					ctx.translate(-8, -16.5);
				}

				if (w == 15) {
					ctx.translate(-7.5, -16.5);
				}

				ctx.drawImage(pi, offset, 94, w, 41, x - 15, y - 16, w, 41);
			} else {
				if (w == 14) {
					ctx.translate(-7, -16.5);
				}

				if (w == 16) {
					ctx.translate(-8, -16.5);
				}

				if (w == 15) {
					ctx.translate(-7.5, -16.5);
				}

				ctx.drawImage(pi, offset, 94, w, 41, x + 15, y - 16, w, 41);
			}
		} else {
			ctx.translate(-4, -16);
			ctx.drawImage(pi, 267, 102, 9, 32, x, y - 10, 9, 32);
		}

		ctx.restore();
	},
	projectileCollision: function (x1, y1, w1, h1, dx1, dy1, index) {
		for (let x = 0; x < enemies.unitsOnScreen.length; x++) {

			if (x1 + Math.floor(w1 / dx1) > enemies.unitsOnScreen[x][1] - Math.floor(enemies.unitsOnScreen[x][4] / 2) &&
				x1 - Math.floor(w1 / dx1) < enemies.unitsOnScreen[x][1] + Math.floor(enemies.unitsOnScreen[x][4] / 2) &&
				y1 - Math.floor(h1 / dy1) < enemies.unitsOnScreen[x][2] + Math.floor(enemies.unitsOnScreen[x][5] / 2) &&
				y1 + Math.floor(h1 / dy1) > enemies.unitsOnScreen[x][2] - Math.floor(enemies.unitsOnScreen[x][5] / 2) &&
				y1 > 30) {

				level.hitCoords[0] = x1;
				level.hitCoords[1] = y1;

				enemies.unitsOnScreen[x][6] = true;	

				if (enemies.unitsOnScreen[x][0].startsWith("hs")) {
					//level.explosion1Coords.push([level.hitCoords[0], level.hitCoords[1] - 10]);
					//level.explosion1Coords.pop();
					//console.log(level.explosion1Coords)
					level.explosion1 = true;
				}

				if (index == 0) {
					player.hitDetected[0] = true;
					controlls.firing1 = false;
					controlls.projectilePositionY1 = undefined;
				} else if (index == 1) {
					player.hitDetected[1] = true;
					controlls.firing2 = false;
					controlls.projectilePositionY2 = undefined;
				} else if (index == 2) {
					player.hitDetected[2] = true;
					controlls.firing3 = false;
					controlls.projectilePositionY3 = undefined;
				} else if (index == 3) {
					player.hitDetected[3] = true;
					controlls.firing4 = false;
					controlls.projectilePositionY4 = undefined;
				}
			}
		}
	},
	craftCollision: function (x, y, w, h, dx, dy) {

		for (let i = 0; i < enemies.projectilesOnScreen.length; i++) {
console.log(enemies.projectilesOnScreen)
			if (x + Math.floor(w / dx) > enemies.projectilesOnScreen[1] - Math.floor(enemies.projectilesOnScreen[3] / 2) &&
				x - Math.floor(w / dx) < enemies.projectilesOnScreen[1] + Math.floor(enemies.projectilesOnScreen[3] / 2) &&
				y - Math.floor(h / dy) < enemies.projectilesOnScreen[2] + Math.floor(enemies.projectilesOnScreen[4] / 2) &&
				y + Math.floor(h / dy) > enemies.projectilesOnScreen[2] - Math.floor(enemies.projectilesOnScreen[4] / 2)) {
console.log("projectile hit")
				player.hitCoords[0] = x;
				player.hitCoords[1] = y;
				enemies.projectilesOnScreen[5] = false;
				enemies.projectilesOnScreen[1] = undefined;
			}
		}

		/*enemies.projectilesOnScreen.forEach(function (projectile){
			if (x + Math.floor(w / dx) > projectile[1] - Math.floor(projectile[3] / 2) &&
				x - Math.floor(w / dx) < projectile[1] + Math.floor(projectile[3] / 2) &&
				y - Math.floor(h / dy) < projectile[2] + Math.floor(projectile[4] / 2) &&
				y + Math.floor(h / dy) > projectile[2] - Math.floor(projectile[4] / 2)) {
console.log("projectile hit")
				player.hitCoords[0] = x;
				player.hitCoords[1] = y;
				projectile[5] = false;
				projectile[1] = undefined;
			}
		});*/

		enemies.unitsOnScreen.forEach(function (unit){
			if (x + Math.floor(w / dx) > unit[1] - Math.floor(unit[3] / 2) &&
				x - Math.floor(w / dx) < unit[1] + Math.floor(unit[3] / 2) &&
				y - Math.floor(h / dy) < unit[2] + Math.floor(unit[4] / 2) &&
				y + Math.floor(h / dy) > unit[2] - Math.floor(unit[4] / 2)) {
console.log("enemy hit")
				player.hitCoords[0] = x;
				player.hitCoords[1] = y;
				unit[3] = 0;
			}
		});
	},
	drawSpecial: function () {
		this.firingSpecial = true;
		this.specialCount += 1;
		this.tiltCount = 0;

		switch(this.specialCount) {
			case 1:
				this.bombs -= 1;
			break;

			case 28:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 30:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 32:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 34:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 36:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 38:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 40:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 42:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 44:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 46:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 48:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 50:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 52:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 54:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 56:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 58:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 60:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 62:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 64:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 66:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 68:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 70:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 72:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 74:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 76:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 78:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 80:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 82:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 84:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 86:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 88:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 90:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 92:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 94:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 96:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 98:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 100:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 102:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 104:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 106:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 108:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 110:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 112:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 114:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 116:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 118:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 120:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 122:
				ctx.drawImage(pi, 247, 136 + controlls.specialReverse, 80, 32 + player.y, player.x - 41,  0, 80, 32 + player.y);
			break;

			case 124:
				ctx.drawImage(pi, 65, 136 + controlls.specialReverse, 87, 32 + player.y, player.x - 44,  0, 87, 32 + player.y);
			break;

			case 126:
				ctx.drawImage(pi, 152, 136 + controlls.specialReverse, 94, 32 + player.y, player.x - 48,  0, 94, 32 + player.y);
			break;

			case 128:
				ctx.drawImage(pi, 0, 136 + controlls.specialReverse, 64, 32 + player.y, player.x - 41,  0, 64, 32 + player.y);
			break;

			default:

				if (this.specialCount >= 4 && this.specialCount < 7) {
					this.specialMove = 64;
				} else if (this.specialCount >= 7 && this.specialCount < 10) {
					this.specialMove = 32;
				} else if (this.specialCount >= 10 && this.specialCount < 13) {
					this.specialMove = 0;
				} else if (this.specialCount >= 13 && this.specialCount < 16) {
					ctx.drawImage(pi, 214, 0, 87, 94, player.x - 44.5, player.y - 51, 87, 94);
				} else if (this.specialCount >= 16 && this.specialCount < 19) {
					ctx.drawImage(pi, 302, 0, 63, 72, player.x - 32, player.y - 37, 63, 72);
				} else if (this.specialCount >= 19 && this.specialCount < 22) {
					ctx.drawImage(pi, 366, 0, 57, 87, player.x - 29, player.y - 56, 57, 87);
				} else if (this.specialCount >= 22 && this.specialCount < 25) {
					ctx.drawImage(pi, 424, 0, 53, 135, player.x - 25, player.y - 106, 53, 135);
				} else if (this.specialCount >= 25 && this.specialCount < 28) {
					ctx.drawImage(pi, 0, 136 + controlls.specialReverse, 64, 32 + player.y, player.x - 33,  -2, 64, 32 + player.y);
				} else if (this.specialCount >= 129 && this.specialCount < 132) {
					ctx.drawImage(pi, 328, 136 + controlls.specialReverse, 78, 32 + player.y, player.x - 40,  -2, 78, 32 + player.y);
				} else if (this.specialCount >= 132 && this.specialCount < 135) {
					ctx.drawImage(pi, 407, 136 + controlls.specialReverse, 72, 32 + player.y, player.x - 38,  -2, 72, 32 + player.y);
				} else if (this.specialCount >= 135 && this.specialCount < 138) {
					ctx.drawImage(pi, 0, 365 + controlls.specialReverse, 66, 32 + player.y, player.x - 34,  -2, 66, 32 + player.y);
				} else if (this.specialCount >= 138 && this.specialCount < 141) {
					ctx.drawImage(pi, 67, 365 + controlls.specialReverse, 65, 32 + player.y, player.x - 34,  -2, 65, 32 + player.y);
				} else if (this.specialCount >= 141 && this.specialCount < 144) {
					ctx.drawImage(pi, 133, 365 + controlls.specialReverse, 57, 32 + player.y, player.x - 28,  -2, 57, 32 + player.y);
				} else if (this.specialCount >= 144 && this.specialCount < 147) {
					ctx.drawImage(pi, 191, 365 + controlls.specialReverse, 55, 32 + player.y, player.x - 44,  -2, 55, 32 + player.y);
				} else if (this.specialCount >= 147 && this.specialCount < 150) {
					ctx.drawImage(pi, 247, 365 + controlls.specialReverse, 39, 32 + player.y, player.x - 24,  -2, 39, 32 + player.y);
				}

			break;
		}

		if (this.specialCount < 13) {
			ctx.drawImage(pi, 200, 41, 13, 48, player.x - 6, player.y - (92 + this.specialMove), 13, 48);
			ctx.drawImage(pi, 119, 103, 32, 32, player.x + (32 + this.specialMove), player.y - (65 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 218, 108, 48, 13, player.x + (37 + this.specialMove), player.y - 6, 48, 13);
			ctx.drawImage(pi, 185, 103, 32, 32, player.x + (29 + this.specialMove), player.y + (34 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 186, 41, 13, 48, player.x - 6, player.y + (40 + this.specialMove), 13, 48);
			ctx.drawImage(pi, 152, 103, 32, 32, player.x - (62 + this.specialMove), player.y + (34 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 218, 122, 48, 13, player.x - (85 + this.specialMove), player.y - 6, 48, 13);
			ctx.drawImage(pi, 86, 103, 32, 32, player.x - (66 + this.specialMove), player.y - (65 + this.specialMove), 32, 32);
		}
		
		if (this.specialCount > 165) {
			this.specialCount = 0;
			this.specialMove = 96;
			controlls.special = false;
		}
		this.firingSpecial = false;
	},
	drawDeath: function () {
		this.deathCount++;

		ctx.save();

		switch (this.deathCount) {
			case 1:
				ctx.translate(-15, -21);
				ctx.drawImage(pi, 0, 594, 32, 43, this.x, this.y, 32, 43);
				this.dead = true;
			break;

			case 2:
				ctx.translate(-64, -64);
				ctx.drawImage(pi, 33, 595, 128, 128, this.x, this.y, 128, 128);
			break;

			case 3:
				ctx.translate(-64, -64);
				ctx.drawImage(pi, 162, 595, 128, 128, this.x, this.y, 128, 128);
			break;

			case 4:
				ctx.translate(-64, -64);
				ctx.drawImage(pi, 291, 595, 128, 128, this.x, this.y, 128, 128);
			break;

			case 5:
				ctx.translate(-64, -64);
				ctx.drawImage(pi, 420, 595, 128, 128, this.x, this.y, 128, 128);
			break;

			case 6:
				ctx.translate(-63, -63);
				ctx.drawImage(pi, 0, 724, 126, 126, this.x, this.y, 126, 126);
			break;

			case 7:
				ctx.translate(-25, -30);
				ctx.drawImage(pi, 38, 752, 50, 61, this.x, this.y, 50, 61);
			break;

			default:
				if (this.deathCount >= 8 && this.deathCount < 11) {
					ctx.translate(-26, -32);
					ctx.drawImage(pi, 127, 723, 53, 64, this.x, this.y, 53, 64);
				} else if (this.deathCount >= 11 && this.deathCount < 14) {
					ctx.translate(-27, -32);
					ctx.drawImage(pi, 181, 723, 55, 64, this.x, this.y, 55, 64);
				} else if (this.deathCount >= 14 && this.deathCount < 17) {
					ctx.translate(-29, -34);
					ctx.drawImage(pi, 237, 723, 59, 68, this.x, this.y, 59, 68);
				} else if (this.deathCount >= 17 && this.deathCount < 20) {
					ctx.translate(-30, -36);
					ctx.drawImage(pi, 297, 723, 61, 72, this.x, this.y, 61, 72);
				} else if (this.deathCount >= 20 && this.deathCount < 23) {
					ctx.translate(-30, -36);
					ctx.drawImage(pi, 359, 723, 61, 72, this.x, this.y, 61, 72);
				} else if (this.deathCount >= 23 && this.deathCount < 26) {
					ctx.translate(-31, -36);
					ctx.drawImage(pi, 421, 723, 62, 72, this.x, this.y, 62, 72);
				} else if (this.deathCount >= 26 && this.deathCount < 29) {
					ctx.translate(-31, -36);
					ctx.drawImage(pi, 127, 796, 62, 72, this.x, this.y, 62, 72);
				} else if (this.deathCount >= 29 && this.deathCount < 32) {
					ctx.translate(-32, -36);
					ctx.drawImage(pi, 190, 796, 64, 72, this.x, this.y, 64, 72);
				} else if (this.deathCount >= 32 && this.deathCount < 35) {
					ctx.translate(-32, -36);
					ctx.drawImage(pi, 255, 796, 65, 72, this.x, this.y, 65, 72);
				} else if (this.deathCount >= 35 && this.deathCount < 38) {
					ctx.translate(-31, -35);
					ctx.drawImage(pi, 323, 796, 62, 71, this.x, this.y, 62, 71);
				} else if (this.deathCount >= 38 && this.deathCount < 41) {
					ctx.translate(-29, -35);
					ctx.drawImage(pi, 444, 796, 55, 70, this.x, this.y, 59, 70);
				}
			break;

		}
		
		ctx.restore();
	}
}

const enemies = {
	velX: [2, 2, 2, 2, 2, 2],
	velY: [2, 2, 2, 2, 2, 2],
	heliCountS: 0,
	displayedHeliS: 0,
	heliCountL: 0,
	deathHeliCountL: 0,
	pagodaCount: 0,
	pagodaDeathCount: 0,
	pagodaInc: 0,
	pagodaSvelY: 0,
	pagodasOffset: [0, 0],
	roboTowerCount: 0,
	roboTowerInc: 0,
	roboTowerOffset: -53,
	bossMainCount: 0,
	bossEntranceCount: 0,
	bossEntranceInc: 35,
	headTransform: false,
	bossEnterDone: true,
	bossMoving: false,
	bossMoveInc: 0,
	bossHeadCount: 0,
	bossHeadOpenClose: false,
	headDeathCount: 0,
	bodyCount: 0,
	bossLegCount: 0,
	topTurretOpenClose: false,
	topTurretFireCount: 0,
	topTurretFire: false,
	turretCount: 0,
	topTurretPattern: false,
	headPattern: false,
	turretsPattern: false,
	projectilesDisplayed: 0,
	projectileCounter1: 0,
	projectileCounter2: 0,
	projectileCounter3: 0,
	bossProjectilesInc: [0, 0, 0, 0],
	unitsOnScreen: [],
	projectilesOnScreen: [],
	projectileTemp: [],
	projectileCounter: [
		[0, 0, 0], [0, 0, 0], [0, 0, 0]
	],
	tankCounters: [
		[0, 0, 0]
	],
	heliS: [																					//285
		["hs1", 195, 15, 1, 9, 30, false, true], ["hs2", 240, 30, 1, 9, 30, false, true], ["hs3", 265, 45, 1, 9, 30, false, true],
		["hs4", 113, -15, 1, 9, 30, false, true], ["hs5", 63, -30, 1, 9, 30, false, true], ["hs6", 14, -45, 1, 9, 30, false, true],
	],// 15 30 45
	vehicles: [
		["st0", 143, -15, 4, 20, 29, false, true], ["st1", 143, -15, 3, 20, 29, false, true], ["st2", 143, -15, 3, 20, 29, false, true],
	],
	miniBoss: [
		["hl", 192, -35, 30, 28, 70, false, true],
		[0, 0, 0],
		[112, -44], [224, -44],
		["pl0", 192, -40, 30, 28, 70, false, true], ["pl1", 192, -40, 30, 28, 70, false, true]
	],
	boss: [
		["bh", 192, 40, 100, 44, 26, false, true], ["btl", 192, -40, 100, 11, 15, false, true], ["btr", 192, -40, 100, 11, 15, false, true],
		["bb", 192, -40, 100, 28, 70, false, true]
	],
	bossFireCount: [0, 0],
	bossDeathCount: [0, 0, 0],
	drawHeliS: function (x, y, index) {
		let tempInc;
		let tempOffset = 0;

		/*for (let z = 0; z < this.unitsOnScreen.length; z++) {
			if (this.unitsOnScreen[z][0] == "hs1" || this.unitsOnScreen[z][0] == "hs2" || this.unitsOnScreen[z][0] == "hs3" ||
				this.unitsOnScreen[z][0] == "hs4" || this.unitsOnScreen[z][0] == "hs5" || this.unitsOnScreen[z][0] == "hs6" && 
				this.unitsOnScreen[z][7] == false) {
				//console.log(this.unitsOnScreen[z])
			}
		}*/

		if (this.displayedHeliS == 1) {
			tempInc = 1;
		} else if (this.displayedHeliS == 2) {
			tempInc = 0.5;
		} else if (this.displayedHeliS == 3) {
			tempInc = 0.3;
		} else if (this.displayedHeliS == 4) {
			tempInc = 0.2;
		} else if (this.displayedHeliS >= 5) {
			tempInc = 0.1;
		}


		if (this.heliS[index][6] == true) {
			//tempOffset = 31;
			this.heliS[index][3] = this.heliS[index][3] - 1;
			player.score = player.score + 200;
			level.explosion1Coords.push([this.heliS[index][1], this.heliS[index][2]]);
			this.heliS[index][6] = false;
			for (let z = 0; z < this.unitsOnScreen.length; z++) {
				if (this.unitsOnScreen[z][7] == false) {
					level.explosion1 = true;
					this.unitsOnScreen.splice(this.unitsOnScreen[z], 1);
					this.displayedHeliS -= 1;
				}
			}
		}

		if (this.heliS[index][3] <= 0) {
			this.heliS[index][7] = false;
			this.displayedHeliS -= 1;
			/*for (let z = 0; z < this.unitsOnScreen.length; z++) {
				if (this.unitsOnScreen[z][0].startsWith("hs") == true && this.unitsOnScreen[z][7] == false) {
					level.explosion1 = true;
					console.log(this.unitsOnScreen[z])
					this.unitsOnScreen.splice(this.unitsOnScreen[z], 1);
					this.displayedHeliS -= 1;
				}*/

				/*if (enemies.unitsOnScreen[z][0] != "hl" && enemies.unitsOnScreen[z][7] == false) {
					console.log(enemies.unitsOnScreen[z][0])
				}*/
				
				//if (enemies.unitsOnScreen[z][0] == `hs${index}` && enemies.unitsOnScreen[z][7] == false) {
					//console.log(`hs${index}`)
				/*	player.score = player.score + 200;
					level.explosion1Coords.push([this.heliS[index][1], this.heliS[index][2], 1]);
					level.explosion1 = true;
					this.unitsOnScreen.splice(this.unitsOnScreen[z], 1);*/
				//}
			//}
		}

		if (this.heliS[index][7] == true) {
			this.heliCountS += tempInc;
		
			ctx.save();
			ctx.translate(-15, -15);

			if (this.heliCountS < 5) {
				ctx.drawImage(en, 249, tempOffset, 29, 30, x, y, 29, 30);
			} else {
				ctx.drawImage(en, 279, tempOffset, 29, 29, x, y, 29, 29);
			}
		}

		if (this.heliCountS >= 9) {
			this.heliCountS = 0;
		}

		ctx.restore();
	},
	drawHeliL: function (x, y) {
		let temp;
		
		enemies.unitsOnScreen.find(function (unit) {
			if (unit[0] == "hl") {
				temp = unit;
			}
		});

		this.heliCountL++;
		let tempOffset = 0;

		ctx.save();

		if (this.miniBoss[0][3] <= 18) {

			if (this.heliCountL == this.miniBoss[0][3]) {
				tempOffset = 154;
			} else if (this.heliCountL == this.miniBoss[0][3] * 2) {
				tempOffset = 154;
			} else if (this.heliCountL == this.miniBoss[0][3] * 4) {
				tempOffset = 154;
			} else if (this.heliCountL == this.miniBoss[0][3] * 6) {
				tempOffset = 154;
			} else if (this.heliCountL == this.miniBoss[0][3] * 8) {
				tempOffset = 154;
			} else if (this.heliCountL == this.miniBoss[0][3] * 10) {
				tempOffset = 154;
			}
		}

		if (this.miniBoss[0][6] == true) {
			tempOffset = 77;
			this.miniBoss[0][3] = this.miniBoss[0][3] - 1;
			this.miniBoss[0][6] = false;
		}

		if (this.miniBoss[0][3] > 0) {
			if (this.heliCountL < 6) {
				ctx.translate(-32, -37);
				ctx.drawImage(en, 0, tempOffset, 64, 73, x, y, 64, 73);
			} else if (this.heliCountL >= 6 && this.heliCountL < 11) {
				ctx.translate(-32, -37);
				ctx.drawImage(en, 65, tempOffset, 64, 75, x, y, 64, 75);
			} else if (this.heliCountL >= 11 && this.heliCountL < 16) {
				ctx.translate(-29, -37);
				ctx.drawImage(en, 130, tempOffset, 58, 76, x, y, 58, 76);
			} else if (this.heliCountL >= 16) {
				ctx.translate(-32, -37);
				ctx.drawImage(en, 189, tempOffset, 59, 75, x, y, 59, 75);
			}

			if (this.heliCountL == 20) {
				this.heliCountL = 0;
			}
		} else {
			if (this.deathHeliCountL == 1) {
				player.score = player.score + 1000;
				level.explosion4Coords.push([this.miniBoss[0][1], this.miniBoss[0][2], 1]);
				level.explosion4 = true;
				this.unitsOnScreen.splice(temp, 1);
			}

			this.deathHeliCountL++;

			if (this.deathHeliCountL < 7) {
				ctx.translate(-20, -35);
				ctx.drawImage(en, 258, 62, 40, 70, x, y, 40, 70);
			} else if (this.deathHeliCountL >= 7 && this.deathHeliCountL < 13) {
				ctx.translate(-17, -30);
				ctx.drawImage(en, 598, 0, 34, 60, x, y, 34, 60);
			} else if (this.deathHeliCountL >= 13 && this.deathHeliCountL < 19) {
				ctx.translate(-11, -26);
				ctx.drawImage(en, 598, 61, 22, 53, x, y, 22, 53);
			} else if (this.deathHeliCountL >= 19 && this.deathHeliCountL < 25) {
				ctx.translate(-9, -22);
				ctx.drawImage(en, 598, 115, 18, 44, x, y, 18, 44);
			} else if (this.deathHeliCountL >= 25 && this.deathHeliCountL < 31) {
				ctx.translate(-7, -17);
				ctx.drawImage(en, 598, 160, 14, 35, x, y, 14, 35);
			} else {
				this.miniBoss[0][7] = false;
				
				if (this.deathHeliCountL == 31) {
					level.explosion2Coords.push([this.miniBoss[0][1], this.miniBoss[0][2], 1]);
					level.explosion2 = true;
				}
			}
		}

		ctx.restore();
	},
	drawTank: function (x, y, index) {
		let tempY = 547;
		enemies.vehicles[index][2] += 0.5;
		
		if (enemies.vehicles[index][6] == true) {
			tempY = 577;
			enemies.vehicles[index][3] = enemies.vehicles[index][3] - 1;
			enemies.vehicles[index][6] = false;
		}

		if (enemies.vehicles[index][3] <= 2 && enemies.vehicles[index][3] > 0) {
			enemies.tankCounters[index]++;

			if (enemies.tankCounters[index] == 2) {
				tempY = 607;
			}

			if (enemies.tankCounters[index] == 4) {
				enemies.tankCounters[index] = 0;
			}
		} else if (enemies.vehicles[index][3] <= 0) {
			enemies.vehicles[index][7] = false;
			ctx.drawImage(en, 617, 637, 27, 30, enemies.vehicles[index][1] - 14, enemies.vehicles[index][2] - 16, 27, 30);

			for (let i = 0; i < enemies.unitsOnScreen.length; i++) {
				if (enemies.unitsOnScreen[i][0] == `st${index}`) {
					level.explosion2Coords.push([enemies.vehicles[index][1], enemies.vehicles[index][2] - 16]);
					level.explosion2 = true;
					enemies.unitsOnScreen.splice(enemies.unitsOnScreen[i], 1);
				}
			}
		}

		if (enemies.vehicles[index][3] > 0) {
			ctx.save();
			ctx.translate(-10, -15);
			ctx.drawImage(en, 622, tempY, 20, 29, x, y, 20, 29);
			ctx.restore();
		}
	},
	drawPagodaS: function (x, y) {
		this.pagodaCount += this.pagodaInc;
		
		ctx.save();

		if (this.pagodaCount < 1) {
			ctx.translate(-23, -30);
			ctx.drawImage(en, 309, 0, 46, 61, x, y, 46, 61);
		} else if (this.pagodaCount >= 1 && this.pagodaCount < 4) {
			ctx.translate(-32, -30);
			ctx.drawImage(en, 300, 62, 64, 73, x, y, 64, 73);
		} else if (this.pagodaCount >= 4) {
			ctx.translate(-28, -30);
			ctx.drawImage(en, 304, 136, 57, 69, x, y, 57, 69);
		}

		ctx.restore();

		if (this.pagodaCount == 7) {
			this.pagodaCount = 1;
		}
	},
	drawPagodaL: function (x, y, index) {
		let offset = 0;
		this.pagodaCount += 0.2;

		if (this.miniBoss[4][3] <= 2) {
			this.pagodaDeathCount++;

			if (this.pagodaDeathCount == Math.floor(this.miniBoss[4][3] / 2)) {
				offset = 226;
			}

			if (this.pagodaDeathCount == this.miniBoss[4][3]) {
				this.pagodaDeathCount = 0;
			}
		}

		if (this.miniBoss[4][6] == true) {
			offset = 113;
		}

		if (x + this.pagodasOffset[index] > player.x) {
			this.pagodasOffset[index] -= 0.5;
		} else if (x + this.pagodasOffset[index] < player.x) {
			this.pagodasOffset[index] += 0.5;
		}

		ctx.save();

		if (this.pagodaCount < 4) {
			ctx.translate(-25, -56);
			ctx.drawImage(en, 370, 0 + offset, 51, 112, x + this.pagodasOffset[index], y, 51, 112);
		} else if (this.pagodaCount >= 4 && this.pagodaCount < 7) {
			ctx.translate(-27, -47);
			ctx.drawImage(en, 422, 0 + offset, 55, 103, x + this.pagodasOffset[index], y, 55, 103);
		} else if (this.pagodaCount >= 7 && this.pagodaCount < 10) {
			ctx.translate(-31, -54);
			ctx.drawImage(en, 478, 0 + offset, 62, 110, x + this.pagodasOffset[index], y, 62, 110);
		} else if (this.pagodaCount >= 10) {
			ctx.translate(-28, -47);
			ctx.drawImage(en, 541, 0 + offset, 55, 103, x + this.pagodasOffset[index], y, 55, 103);
		}

		ctx.restore();

		if (this.pagodaCount >= 12) {
			this.pagodaCount = 0;
		}
	},
	drawRoboTower: function (x, y) {
		this.roboTowerCount += this.roboTowerInc;

		ctx.save();

		if (this.roboTowerCount < 1) {
			ctx.translate(-32, -52);
			ctx.drawImage(en, 0, 545, 64, 105, x, y, 64, 105);
		} else if (this.roboTowerCount >= 1 && this.roboTowerCount < 8) {
			ctx.translate(-32, -53);
			ctx.drawImage(en, 65, 545, 64, 106, x, y, 64, 106);
		} else if (this.roboTowerCount >= 8 && this.roboTowerCount < 15) {
			ctx.translate(-32, -53);
			ctx.drawImage(en, 130, 545, 64, 106, x, y, 64, 106);
		} else if (this.roboTowerCount >= 15 && this.roboTowerCount < 22) {
			ctx.translate(-32, -53);
			ctx.drawImage(en, 195, 545, 64, 106, x, y, 64, 106);
		} else if (this.roboTowerCount >= 22 && this.roboTowerCount < 29) {
			ctx.translate(-32, -53);
			ctx.drawImage(en, 260, 545, 64, 106, x, y, 64, 106);
		} else if (this.roboTowerCount >= 29 && this.roboTowerCount < 36) {
			ctx.translate(-32, -53);
			ctx.drawImage(en, 325, 545, 64, 106, x, y, 64, 106);
		} else if (this.roboTowerCount >= 36 && this.roboTowerCount < 43) {
			ctx.translate(-32, -55);
			ctx.drawImage(en, 390, 545, 64, 108, x, y, 64, 108);
		} else if (this.roboTowerCount >= 43 && this.roboTowerCount < 50) {
			ctx.translate(-32, -61);
			ctx.drawImage(en, 455, 545, 64, 114, x, y, 64, 114);
		} else if (this.roboTowerCount >= 50 && this.roboTowerCount < 57) {
			ctx.translate(-32, -62);
			ctx.drawImage(en, 520, 545, 64, 115, x, y, 64, 115);
		} else if (this.roboTowerCount >= 57 && this.roboTowerCount < 64) {
			ctx.translate(-32, -61);										// 10
			ctx.drawImage(en, 0, 661, 64, 114, x, y, 64, 114);
		} else if (this.roboTowerCount >= 64 && this.roboTowerCount < 66) {
			ctx.translate(-32, -62);
			ctx.drawImage(en, 65, 661, 64, 115, x, y, 64, 115);
		} else if (this.roboTowerCount >= 66 && this.roboTowerCount < 68) {
			ctx.translate(-32, -64);
			ctx.drawImage(en, 130, 661, 64, 117, x, y, 64, 117);
		} else if (this.roboTowerCount >= 68 && this.roboTowerCount < 72) {
			ctx.translate(-32, -65);
			ctx.drawImage(en, 195, 661, 64, 118, x, y, 64, 118);
		} else if (this.roboTowerCount >= 72 && this.roboTowerCount < 74) {
			ctx.translate(-32, -66);
			ctx.drawImage(en, 260, 661, 64, 119, x, y, 64, 119);
		} else if (this.roboTowerCount >= 74 && this.roboTowerCount < 76) {
			ctx.translate(-32, -68);
			ctx.drawImage(en, 325, 661, 64, 121, x, y, 64, 121);
		} else if (this.roboTowerCount >= 76 && this.roboTowerCount < 80) {
			ctx.translate(-32, -69);
			ctx.drawImage(en, 390, 661, 64, 122, x, y, 64, 122);
		} else if (this.roboTowerCount >= 80 && this.roboTowerCount < 82) {
			ctx.translate(-32, -70);
			ctx.drawImage(en, 455, 661, 64, 123, x, y, 64, 123);
		} else if (this.roboTowerCount >= 82 && this.roboTowerCount < 83) {
			ctx.translate(-32, -69);
			ctx.drawImage(en, 520, 661, 64, 122, x, y, 64, 122);
		} else if (this.roboTowerCount >= 83 && this.roboTowerCount < 84) {
			ctx.translate(-32, -70);
			ctx.drawImage(en, 0, 785, 64, 123, x, y, 64, 123);
		} else if (this.roboTowerCount >= 84 && this.roboTowerCount < 88) {
			ctx.translate(-32, -71);										// 20
			ctx.drawImage(en, 65, 785, 64, 124, x, y, 64, 124);
		} else if (this.roboTowerCount >= 88 && this.roboTowerCount < 90) {
			ctx.translate(-32, -74);
			ctx.drawImage(en, 130, 785, 64, 127, x, y, 64, 127);
		} else if (this.roboTowerCount >= 90 && this.roboTowerCount < 92) {
			ctx.translate(-32, -75);
			ctx.drawImage(en, 195, 785, 64, 128, x, y, 64, 128);
		} else if (this.roboTowerCount >= 92 && this.roboTowerCount < 94) {
			ctx.translate(-32, -74);
			ctx.drawImage(en, 260, 785, 64, 127, x, y, 64, 127);
		} else if (this.roboTowerCount >= 94 && this.roboTowerCount < 98) {
			ctx.translate(-32, -75);
			ctx.drawImage(en, 325, 785, 64, 128, x, y, 64, 128);
		} else if (this.roboTowerCount >= 98 && this.roboTowerCount < 99) {
			ctx.translate(-32, -75);
			ctx.drawImage(en, 390, 785, 64, 128, x, y, 64, 128);
		} else if (this.roboTowerCount >= 99 && this.roboTowerCount < 100) {
			ctx.translate(-32, -77);										// fire type 3
			ctx.drawImage(en, 520, 785, 64, 130, x, y, 64, 130);
		} else if (this.roboTowerCount >= 100 && this.roboTowerCount < 101) {
			ctx.translate(-32, -78);
			ctx.drawImage(en, 0, 916, 64, 131, x, y, 64, 131);
		} else if (this.roboTowerCount >= 101 && this.roboTowerCount < 105) {
			ctx.translate(-32, -79);
			ctx.drawImage(en, 65, 916, 64, 132, x, y, 64, 132);
		} else if (this.roboTowerCount >= 105 && this.roboTowerCount < 107) {
			ctx.translate(-32, -80);
			ctx.drawImage(en, 130, 916, 64, 133, x, y, 64, 133);
		} else if (this.roboTowerCount >= 107 && this.roboTowerCount < 109) {
			ctx.translate(-32, -81);										// 30
			ctx.drawImage(en, 195, 916, 64, 134, x, y, 64, 134);
		} else if (this.roboTowerCount >= 109 && this.roboTowerCount < 111) {
			ctx.translate(-32, -82);
			ctx.drawImage(en, 260, 916, 64, 135, x, y, 64, 135);
		} else if (this.roboTowerCount >= 111 && this.roboTowerCount < 113) {
			ctx.translate(-32, -83);
			ctx.drawImage(en, 325, 916, 64, 136, x, y, 64, 136);
		} else if (this.roboTowerCount >= 113 && this.roboTowerCount < 117) {
			ctx.translate(-32, -83);
			ctx.drawImage(en, 390, 916, 64, 136, x, y, 64, 136);
		} else if (this.roboTowerCount >= 117 && this.roboTowerCount < 119) {
			ctx.translate(-32, -84);
			ctx.drawImage(en, 455, 916, 64, 137, x, y, 64, 137);
		} else if (this.roboTowerCount >= 119 && this.roboTowerCount < 121) {
			ctx.translate(-32, -85);
			ctx.drawImage(en, 520, 916, 64, 138, x, y, 64, 138);
		} else if (this.roboTowerCount >= 121 && this.roboTowerCount < 125) {
			ctx.translate(-32, -86);
			ctx.drawImage(en, 0, 1055, 64, 139, x, y, 64, 139);
		} else if (this.roboTowerCount >= 125 && this.roboTowerCount < 126) {
			ctx.translate(-32, -88);
			ctx.drawImage(en, 65, 1055, 64, 141, x, y, 64, 141);
		} else if (this.roboTowerCount >= 126 && this.roboTowerCount < 128) {
			ctx.translate(-32, -89);
			ctx.drawImage(en, 130, 1055, 64, 142, x, y, 64, 142);
		} else if (this.roboTowerCount >= 128 && this.roboTowerCount < 130) {
			ctx.translate(-32, -88);
			ctx.drawImage(en, 195, 1055, 64, 141, x, y, 64, 141);
		} else if (this.roboTowerCount >= 130 && this.roboTowerCount < 132) {
			ctx.translate(-32, -88);										// 40
			ctx.drawImage(en, 260, 1055, 64, 141, x, y, 64, 141);
		} else if (this.roboTowerCount >= 132 && this.roboTowerCount < 134) {	
			ctx.translate(-32, -89);
			ctx.drawImage(en, 390, 1055, 64, 142, x, y, 64, 142);
		} else if (this.roboTowerCount >= 134 && this.roboTowerCount < 136) {
			ctx.translate(-32, -90);
			ctx.drawImage(en, 455, 1055, 64, 143, x, y, 64, 143);
		} else if (this.roboTowerCount >= 136 && this.roboTowerCount < 138) {
			ctx.translate(-32, -91);
			ctx.drawImage(en, 520, 1055, 64, 144, x, y, 64, 144);
		} else if (this.roboTowerCount >= 138 && this.roboTowerCount < 139) {
			ctx.translate(-32, -94);
			ctx.drawImage(en, 0, 1200, 64, 147, x, y, 64, 147);
		} else if (this.roboTowerCount >= 139 && this.roboTowerCount < 141) {
			ctx.translate(-32, -95);
			ctx.drawImage(en, 65, 1200, 64, 148, x, y, 64, 148);
		} else if (this.roboTowerCount >= 141 && this.roboTowerCount < 143) {
			ctx.translate(-32, -98);
			ctx.drawImage(en, 130, 1200, 66, 151, x, y, 66, 151);
		} else if (this.roboTowerCount >= 143 && this.roboTowerCount < 145) {
			ctx.translate(-32, -99);
			ctx.drawImage(en, 197, 1200, 66, 152, x, y, 66, 152);
		} else if (this.roboTowerCount >= 145 && this.roboTowerCount < 149) {
			ctx.translate(-32, -102);
			ctx.drawImage(en, 264, 1200, 66, 155, x, y, 66, 155);
		} else if (this.roboTowerCount >= 149 && this.roboTowerCount < 150) {
			ctx.translate(-32, -104);
			ctx.drawImage(en, 331, 1200, 66, 157, x, y, 66, 157);
		} else if (this.roboTowerCount >= 150 && this.roboTowerCount < 152) {
			ctx.translate(-32, -104);										// 50
			ctx.drawImage(en, 398, 1200, 65, 157, x, y, 65, 157);
		} else if (this.roboTowerCount >= 152 && this.roboTowerCount < 156) {
			ctx.translate(-32, -105);
			ctx.drawImage(en, 464, 1200, 65, 158, x, y, 65, 158);
		} else if (this.roboTowerCount >= 156 && this.roboTowerCount < 158) {
			ctx.translate(-32, -106);
			ctx.drawImage(en, 530, 1200, 65, 159, x, y, 65, 159);
		} else if (this.roboTowerCount >= 158 && this.roboTowerCount < 159) {
			ctx.translate(-32, -103);
			ctx.drawImage(en, 0, 1360, 65, 156, x, y, 65, 156);
		} else if (this.roboTowerCount >= 159 && this.roboTowerCount < 160) {
			ctx.translate(-32, -102);
			ctx.drawImage(en, 66, 1360, 65, 155, x, y, 65, 155);
		} else if (this.roboTowerCount >= 160 && this.roboTowerCount < 161) {
			ctx.translate(-32, -100);
			ctx.drawImage(en, 132, 1360, 65, 153, x, y, 65, 153);
		} else if (this.roboTowerCount >= 161 && this.roboTowerCount < 162) {
			ctx.translate(-32, -99);
			ctx.drawImage(en, 198, 1360, 65, 152, x, y, 65, 152);
		} else if (this.roboTowerCount >= 162 && this.roboTowerCount < 163) {
			ctx.translate(-32, -97);
			ctx.drawImage(en, 264, 1360, 65, 150, x, y, 65, 150);
		} else if (this.roboTowerCount >= 163 && this.roboTowerCount < 164) {
			ctx.translate(-32, -96);
			ctx.drawImage(en, 330, 1360, 65, 149, x, y, 65, 149);
		} else if (this.roboTowerCount >= 164 && this.roboTowerCount < 165) {
			ctx.translate(-32, -94);
			ctx.drawImage(en, 396, 1360, 65, 147, x, y, 65, 147);
		} else if (this.roboTowerCount >= 165 && this.roboTowerCount < 166) {
			ctx.translate(-32, -93);										// 60
			ctx.drawImage(en, 462, 1360, 65, 146, x, y, 65, 146);
		} else if (this.roboTowerCount >= 165 && this.roboTowerCount < 166) {
			ctx.translate(-32, -91);
			ctx.drawImage(en, 527, 1360, 65, 144, x, y, 65, 144);
		} else if (this.roboTowerCount >= 166 && this.roboTowerCount < 167) {
			ctx.translate(-32, -90);
			ctx.drawImage(en, 0, 1517, 65, 143, x, y, 65, 143);
		} else if (this.roboTowerCount >= 167 && this.roboTowerCount < 168) {
			ctx.translate(-32, -88);
			ctx.drawImage(en, 66, 1517, 65, 141, x, y, 65, 141);
		} else if (this.roboTowerCount >= 168) {
			ctx.translate(-32, -11);
			ctx.drawImage(en, 0, 1661, 64, 64, x, y, 64, 64);
		}

		ctx.restore();

		if (this.roboTowerCount == 168) {
			this.roboTowerInc = 0;
			//this.roboTowerCount = 0;
		}
	},
	drawBossEntrance: function (x, y) {
		let tempInc = 1;
		
		if (this.bossEntranceCount == 180 || this.bossEntranceCount > 271) {
			tempInc = 0;
		}

		if (this.headTransform == true) {
			tempInc = 1;
		}

		this.bossEntranceCount += tempInc;

		ctx.save();

		if (this.bossEntranceCount < 4) {
			ctx.translate(-16, -8);
			ctx.drawImage(b1, 358, 281, 32, 16, x, y, 32, 16);
		} else if (this.bossEntranceCount >= 4 && this.bossEntranceCount < 7) {
			ctx.translate(-18, -19);
			ctx.drawImage(b1, 315, 287, 35, 25, x, y + 11, 35, 25);
		} else if (this.bossEntranceCount >= 7 && this.bossEntranceCount < 10) {
			ctx.translate(-18, -19);
			ctx.drawImage(b1, 391, 281, 35, 39, x, y + 11, 35, 39);
		} else if (this.bossEntranceCount >= 10 && this.bossEntranceCount < 12) {
			ctx.translate(-17, -22);
			ctx.drawImage(b1, 391, 321, 35, 44, x, y + this.bossEntranceInc, 35, 44);
		} else if (this.bossEntranceCount >= 12 && this.bossEntranceCount < 137) {
			if (this.bossEntranceCount >= 8 && this.bossEntranceCount < 11) {
				this.bossEntranceInc = 73;
			} else {
				this.bossEntranceInc++;
			}

			ctx.translate(-17, -22);
			ctx.drawImage(b1, 391, 321, 35, 44, x, y + this.bossEntranceInc, 35, 44);				// head moving
		} else if (this.bossEntranceCount >= 137 && this.bossEntranceCount < 143) {
			ctx.translate(-20, -26);
			ctx.drawImage(b1, 391, 366, 41, 53, x, y + this.bossEntranceInc, 41, 53);
		} else if (this.bossEntranceCount >= 143 && this.bossEntranceCount < 151) {
			this.bossEntranceInc -= 1;
			ctx.translate(-21, -27);
			ctx.drawImage(b1, 391, 420, 43, 55, x, y + this.bossEntranceInc, 43, 55);
		} else if (this.bossEntranceCount >= 151 && this.bossEntranceCount < 157) {
			this.bossEntranceInc -= 2;
			ctx.translate(-22, -28);
			ctx.drawImage(b1, 391, 476, 45, 57, x, y + this.bossEntranceInc, 45, 57);				// body enters
			this.bossMoving = true;
		} else if (this.bossEntranceCount >= 157 && this.bossEntranceCount < 163) {
			this.bossEntranceInc -= 2;
			ctx.translate(-24, -30);
			ctx.drawImage(b1, 391, 534, 48, 60, x, y + this.bossEntranceInc, 48, 60);
		} else if (this.bossEntranceCount >= 163 && this.bossEntranceCount < 169) {
			this.bossEntranceInc -= 2;
			ctx.translate(-26, -32);
			ctx.drawImage(b1, 391, 595, 52, 65, x, y + this.bossEntranceInc, 52, 65);
		} else if (this.bossEntranceCount >= 169 && this.bossEntranceCount < 175) {
			this.bossEntranceInc -= 2;
			ctx.translate(-28, -34);
			ctx.drawImage(b1, 391, 661, 56, 68, x, y + this.bossEntranceInc, 56, 68);
		} else if (this.bossEntranceCount >= 175 && this.bossEntranceCount < 181) {
			ctx.translate(-29, -36);
			ctx.drawImage(b1, 442, 208, 58, 72, x, y + this.bossEntranceInc, 58, 72);
		} else if (this.bossEntranceCount >= 181 && this.bossEntranceCount < 193) {
			ctx.translate(-30, -33);
			ctx.drawImage(b1, 441, 281, 60, 66, x, y + this.bossEntranceInc, 60, 66);
		} else if (this.bossEntranceCount >= 193&& this.bossEntranceCount < 199) {
			ctx.translate(-30, -31);
			ctx.drawImage(b1, 441, 348, 60, 63, x, y + this.bossEntranceInc, 60, 63);
		} else if (this.bossEntranceCount >= 199  && this.bossEntranceCount < 205) {
			ctx.translate(-29, -30);
			ctx.drawImage(b1, 442, 412, 58, 60, x, y + this.bossEntranceInc, 58, 60);
		} else if (this.bossEntranceCount >= 205 && this.bossEntranceCount < 211) {
			ctx.translate(-27, -28);
			ctx.drawImage(b1, 444, 473, 54, 57, x, y + this.bossEntranceInc, 54, 57);
		} else if (this.bossEntranceCount >= 211 && this.bossEntranceCount < 217) {
			ctx.translate(-26, -29);
			ctx.drawImage(b1, 444, 531, 52, 59, x, y + this.bossEntranceInc, 52, 59);
		} else if (this.bossEntranceCount >= 217 && this.bossEntranceCount < 223) {
			ctx.translate(-23, -29);
			ctx.drawImage(b1, 449, 591, 46, 58, x, y + this.bossEntranceInc, 46, 58);
		} else if (this.bossEntranceCount >= 223 && this.bossEntranceCount < 229) {
			ctx.translate(-23, -29);
			ctx.drawImage(b1, 449, 650, 46, 58, x, y + this.bossEntranceInc, 46, 58);
		} else if (this.bossEntranceCount >= 229 && this.bossEntranceCount < 235) {
			ctx.translate(-23, -78);
			ctx.drawImage(b1, 0, 213, 45, 103, x, y + this.bossEntranceInc, 45, 103);
		} else if (this.bossEntranceCount >= 235 && this.bossEntranceCount < 241) {
			ctx.translate(-23, -76);
			ctx.drawImage(b1, 46, 213, 45, 97, x, y + this.bossEntranceInc, 45, 97);
		} else if (this.bossEntranceCount >= 241 && this.bossEntranceCount < 247) {
			ctx.translate(-23, -72);
			ctx.drawImage(b1, 92, 213, 45, 89, x, y + this.bossEntranceInc, 45, 89);
		} else if (this.bossEntranceCount >= 247 && this.bossEntranceCount < 253) {
			ctx.translate(-23, -68);
			ctx.drawImage(b1, 138, 213, 45, 81, x, y + this.bossEntranceInc, 45, 81);
		} else if (this.bossEntranceCount >= 253 && this.bossEntranceCount < 259) {
			ctx.translate(-23, -64);
			ctx.drawImage(b1, 184, 213, 45, 73, x, y + this.bossEntranceInc, 45, 73);
		} else if (this.bossEntranceCount >= 259 && this.bossEntranceCount < 265) {
			ctx.translate(-23, -60);
			ctx.drawImage(b1, 230, 213, 45, 65, x, y + this.bossEntranceInc, 45, 65);
		} else if (this.bossEntranceCount >= 265 && this.bossEntranceCount < 271) {
			ctx.translate(-23, -57);
			ctx.drawImage(b1, 276, 213, 45, 58, x, y + this.bossEntranceInc, 45, 58);
		}

		ctx.restore();
	},
	drawBoss: function (x, y) {
		let tempUnit;
		enemies.unitsOnScreen.find(function (unit) {
			if (unit[0] == "bb") {
				tempUnit = unit;
			}
		});

		let tempOffset = 0;

		if (this.boss[3][3] <= this.boss[3][3] / 2) {
			this.bossDeathCount[3]++;

			if (this.bossDeathCount[3] == Math.floor(this.boss[3][3] / 2))

			if (this.bossDeathCount[3] >= this.boss[3][3]) {
				this.bossDeathCount[3] = 0;
			}

			tempOffset = 242;
		}

		if (this.boss[3][6] == true) {
			tempOffset = 121;
		}

		if (this.topTurretOpenClose == true) {
			if (this.bodyCount < 25) {
				this.bodyCount++;
			} else {
				this.topTurretFire = true;
			}
		} else {
			if (this.bodyCount > 0) {
				this.bodyCount--;
			}
		}

		ctx.save();
		ctx.translate(-24, -61);

		if (this.bodyCount < 1) {
			if (this.bossEntranceCount < 192) {
				ctx.drawImage(b1, 0, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 192 && this.bossEntranceCount < 198) {
				ctx.drawImage(b1, 49, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 198 && this.bossEntranceCount < 204) {
				ctx.drawImage(b1, 98, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 204 && this.bossEntranceCount < 210) {
				ctx.drawImage(b1, 147, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 210 && this.bossEntranceCount < 216) {
				ctx.drawImage(b1, 196, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 216 && this.bossEntranceCount < 222) {
				ctx.drawImage(b1, 245, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 222 && this.bossEntranceCount < 228) {
				ctx.drawImage(b1, 294, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 228 && this.bossEntranceCount < 234) {
				ctx.drawImage(b1, 343, 497, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 234 && this.bossEntranceCount < 271) {
				ctx.drawImage(b1, 245, 620, 48, 122, x, y, 48, 122);
			} else if (this.bossEntranceCount >= 271) {
				ctx.drawImage(b1, 0, 620 + tempOffset, 48, 120, x, y, 48, 120);
			}
		} else if (this.bodyCount >= 1 && this.bodyCount < 9) {
			ctx.drawImage(b1, 49, 620 + tempOffset, 48, 120, x, y, 48, 120);
		} else if (this.bodyCount >= 9 && this.bodyCount < 17) {
			ctx.drawImage(b1, 98, 620 + tempOffset, 48, 120, x, y, 48, 120);
		} else if (this.bodyCount >= 17 && this.bodyCount < 25) {
			ctx.drawImage(b1, 147, 620 + tempOffset, 48, 120, x, y, 48, 120);
		} else if (this.bodyCount >= 25) {
			ctx.drawImage(b1, 196, 620 + tempOffset, 48, 120, x, y, 48, 120);
		}

		ctx.restore();

		if (this.bossMoving == true) {
			this.bossLegCount++;
		}

		this.drawLegsL(x - 48, y - 2);
		this.drawLegsR(x + 50, y - 2);
		
		if (this.bossLegCount >= 33) {
			this.bossLegCount = 0;
		}

		if (this.bossEntranceCount >= 270) {
			this.drawHead(x + 1, y + 64);
		}

		if (this.boss[1][7] == true) {
			this.drawTurretL(x - 23, y - 13);
		}
		
		if (this.boss[2][7] == true) {
			this.drawTurretR(x + 22, y - 13);
		}
	},
	drawHead: function (x, y) {
		this.boss[0][1] = x;
		this.boss[0][2] = y - 32;

		let offset = 0;

		if (this.boss[0][3] <= 50) {
			this.headDeathCount++;

			if (this.headDeathCount == Math.floor(this.boss[0][3] / 2)) {
				offset = 120;
			}

			if (this.headDeathCount == this.boss[0][3]) {
				this.headDeathCount = 0;
			}
		}

		if (this.boss[0][6] == true) {
			offset = 60;
			this.boss[0][6] = false;
		}

		ctx.save();
		ctx.translate(-23, -57);

		if (this.bossHeadCount < 1) {
			ctx.drawImage(b1, 0, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 1 && this.bossHeadCount < 3) {
			ctx.drawImage(b1, 46, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 3 && this.bossHeadCount < 6) {
			ctx.drawImage(b1, 92, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 6 && this.bossHeadCount < 9) {
			ctx.drawImage(b1, 138, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 9 && this.bossHeadCount < 12) {
			ctx.drawImage(b1, 184, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 12 && this.bossHeadCount < 15) {
			ctx.drawImage(b1, 230, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 15 && this.bossHeadCount < 18) {
			ctx.drawImage(b1, 276, 317 + offset, 45, 59, x, y, 45, 59);
		} else if (this.bossHeadCount >= 18) {
			ctx.drawImage(b1, 322, 317 + offset, 45, 59, x, y, 45, 59);
		}

		ctx.restore();
	},
	drawLegsL: function (x, y) {
		ctx.save();

		if (this.bossLegCount < 2) {
			ctx.translate(-26, -42);
			ctx.drawImage(b1, 123, 984, 56, 79, x, y, 56, 79);
		} else if (this.bossLegCount >= 2 && this.bossLegCount < 4) {
			ctx.translate(-25, -42);
			ctx.drawImage(b1, 180, 984, 55, 79, x, y, 55, 79);
		} else if (this.bossLegCount >= 4 && this.bossLegCount < 6) {
			ctx.translate(-26, -42);
			ctx.drawImage(b1, 236, 984, 56, 83, x, y, 56, 83);
		} else if (this.bossLegCount >= 6 && this.bossLegCount < 8) {
			ctx.translate(-28, -50);
			ctx.drawImage(b1, 293, 984, 58, 95, x, y, 58, 95);
		} else if (this.bossLegCount >= 8 && this.bossLegCount < 10) {
			ctx.translate(-30, -56);
			ctx.drawImage(b1, 352, 984, 61, 111, x, y, 61, 111);
		} else if (this.bossLegCount >= 10 && this.bossLegCount < 12) {
			ctx.translate(-31, -67);
			ctx.drawImage(b1, 414, 984, 63, 126, x, y, 63, 126);
		} else if (this.bossLegCount >= 12 && this.bossLegCount < 14) {
			ctx.translate(-32, -80);
			ctx.drawImage(b1, 0, 1111, 64, 150, x, y, 64, 150);
		} else if (this.bossLegCount >= 14 && this.bossLegCount < 16) {
			ctx.translate(-32, -80);
			ctx.drawImage(b1, 65, 1111, 64, 160, x, y, 64, 160);
		} else if (this.bossLegCount >= 16 && this.bossLegCount < 18) {
			ctx.translate(-31, -79);
			ctx.drawImage(b1, 130, 1111, 63, 159, x, y, 63, 159);
		} else if (this.bossLegCount >= 18 && this.bossLegCount < 20) {
			ctx.translate(-29, -69);
			ctx.drawImage(b1, 195, 1111, 62, 152, x, y, 62, 152);
		} else if (this.bossLegCount >= 20 && this.bossLegCount < 22) {
			ctx.translate(-30, -58);
			ctx.drawImage(b1, 257, 1111, 62, 130, x, y, 62, 130);
		} else if (this.bossLegCount >= 22 && this.bossLegCount < 24) {
			ctx.translate(-30, -54);
			ctx.drawImage(b1, 320, 1111, 62, 130, x, y, 62, 130);
		} else if (this.bossLegCount >= 24 && this.bossLegCount < 26) {
			ctx.translate(-30, -44);
			ctx.drawImage(b1, 383, 1111, 62, 101, x, y, 62, 101);
		} else if (this.bossLegCount >= 26 && this.bossLegCount < 28) {
			ctx.translate(-30, -42);
			ctx.drawImage(b1, 446, 1111, 59, 89, x, y, 59, 89);
		} else if (this.bossLegCount >= 28 && this.bossLegCount < 30) {
			ctx.translate(-30, -42);
			ctx.drawImage(b1, 0, 984, 60, 84, x, y, 60, 84);
		} else if (this.bossLegCount >= 30 && this.bossLegCount < 32) {
			ctx.translate(-30, -42);
			ctx.drawImage(b1, 61, 984, 60, 81, x, y, 60, 81);
		} else if (this.bossLegCount >= 32 && this.bossLegCount < 34) {
			ctx.translate(-26, -42);
			ctx.drawImage(b1, 123, 984, 56, 79, x, y, 56, 79);
		}

		ctx.restore();
	},
	drawLegsR: function (x, y) {
		ctx.save();
		
		if (this.bossLegCount < 2) {
			ctx.translate(-32, -79);
			ctx.drawImage(b1, 0, 1272, 62, 159, x, y, 62, 159);
		} else if (this.bossLegCount >= 2 && this.bossLegCount < 4) {
			ctx.translate(-32, -69);
			ctx.drawImage(b1, 63, 1272, 61, 153, x, y, 61, 153);
		} else if (this.bossLegCount >= 4 && this.bossLegCount < 6) {
			ctx.translate(-32, -58);
			ctx.drawImage(b1, 125, 1272, 61, 131, x, y, 61, 131);
		} else if (this.bossLegCount >= 6 && this.bossLegCount < 8) {
			ctx.translate(-32, -54);
			ctx.drawImage(b1, 187, 1272, 61, 118, x, y, 61, 118);
		} else if (this.bossLegCount >= 8 && this.bossLegCount < 10) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 249, 1272, 61, 109, x, y, 61, 109);
		} else if (this.bossLegCount >= 10 && this.bossLegCount < 12) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 311, 1272, 61, 99, x, y, 61, 99);
		} else if (this.bossLegCount >= 12 && this.bossLegCount < 14) {
			ctx.translate(-32, -50);
			ctx.drawImage(b1, 373, 1272, 61, 97, x, y, 61, 97);
		} else if (this.bossLegCount >= 14 && this.bossLegCount < 16) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 435, 1272, 61, 98, x, y, 61, 98);
		} else if (this.bossLegCount >= 16 && this.bossLegCount < 18) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 0, 1432, 60, 98, x, y, 60, 98);
		} else if (this.bossLegCount >= 18 && this.bossLegCount < 20) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 61, 1432, 61, 98, x, y, 61, 98);
		} else if (this.bossLegCount >= 20 && this.bossLegCount < 22) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 123, 1432, 64, 98, x, y, 64, 98);
		} else if (this.bossLegCount >= 22 && this.bossLegCount < 24) {
			ctx.translate(-32, -51);
			ctx.drawImage(b1, 188, 1432, 66, 98, x, y, 66, 98);
		} else if (this.bossLegCount >= 24 && this.bossLegCount < 26) {
			ctx.translate(-32, -56);
			ctx.drawImage(b1, 255, 1432, 68, 111, x, y, 68, 111);
		} else if (this.bossLegCount >= 26 && this.bossLegCount < 28) {
			ctx.translate(-32, -67);
			ctx.drawImage(b1, 324, 1432, 69, 126, x, y, 69, 126);
		} else if (this.bossLegCount >= 28 && this.bossLegCount < 30) {
			ctx.translate(-32, -80);
			ctx.drawImage(b1, 394, 1432, 70, 160, x, y, 70, 160);
		} else if (this.bossLegCount >= 30 && this.bossLegCount < 32) {
			ctx.translate(-32, -80);
			ctx.drawImage(b1, 0, 1531, 70, 160, x, y, 70, 160);
		} else if (this.bossLegCount >= 32 && this.bossLegCount < 34) {
			ctx.translate(-32, -79);
			ctx.drawImage(b1, 0, 1272, 62, 159, x, y, 62, 159);
		}

		ctx.restore();
	},
	drawTurretL: function (x, y) {
		let tempOffset = 0;

		this.boss[1][1] = x;
		this.boss[1][2] = y;

		if (this.boss[1][3] <= this.boss[1][3] / 2) {
			this.bossDeathCount[1]++;

			if (this.bossDeathCount[1] == Math.floor(this.boss[1][3] / 2))

			if (this.bossDeathCount[1] >= this.boss[1][3]) {
				this.bossDeathCount[1] = 0;
			}

			tempOffset = 160;
		}

		if (this.boss[1][6] == true) {
			tempOffset = 80;
			this.boss[1][6] = false;
		}

		ctx.save();

		if (this.turretCount < 1) {
			ctx.translate(-5, -7);
			ctx.drawImage(b1, 245 + tempOffset, 742, 11, 15, x, y, 11, 15);
		} else if (this.turretCount >= 1 && this.turretCount < 7) {
			ctx.translate(-9, -7);
			ctx.drawImage(b1, 245 + tempOffset, 758, 15, 15, x, y, 15, 15);
		} else if (this.turretCount >= 7 && this.turretCount < 13) {
			ctx.translate(-13, -7);
			ctx.drawImage(b1, 245 + tempOffset, 774, 19, 15, x, y, 19, 15);
		} else if (this.turretCount >= 13 && this.turretCount < 19) {
			ctx.translate(-17, -7);
			ctx.drawImage(b1, 245 + tempOffset, 790, 23, 15, x, y, 23, 15);
		} else if (this.turretCount >= 19 && this.turretCount < 25) {
			ctx.translate(-21, -7);
			ctx.drawImage(b1, 245 + tempOffset, 806, 27, 15, x, y, 27, 15);
		} else if (this.turretCount >= 25 && this.turretCount < 31) {
			ctx.translate(-25, -7);
			ctx.drawImage(b1, 245 + tempOffset, 822, 31, 15, x, y, 31, 15);
		} else if (this.turretCount >= 37 && this.turretCount < 43) {
			ctx.translate(-29, -7);
			ctx.drawImage(b1, 245 + tempOffset, 838, 35, 15, x, y, 35, 15);
		} else if (this.turretCount >= 43 && this.turretCount < 49) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 854, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 49 && this.turretCount < 55) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 870, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 55 && this.turretCount < 61) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 886, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 61 && this.turretCount < 67) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 903, 39, 17, x, y, 39, 17);
		} else if (this.turretCount >= 67 && this.turretCount < 73) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 920, 39, 19, x, y, 39, 19);
		} else if (this.turretCount >= 73 && this.turretCount < 79) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 940, 39, 20, x, y, 39, 20);
		} else if (this.turretCount >= 79) {
			ctx.translate(-33, -7);
			ctx.drawImage(b1, 245 + tempOffset, 961, 39, 21, x, y, 39, 21);
		}

		ctx.restore();
	},
	drawTurretR: function (x, y) {
		let tempOffset = 0;

		this.boss[2][1] = x;
		this.boss[2][2] = y;

		if (this.boss[2][3] <= this.boss[2][3] / 2) {
			this.bossDeathCount[2]++;

			if (this.bossDeathCount[2] == Math.floor(this.boss[2][3] / 2))

			if (this.bossDeathCount[2] >= this.boss[2][3]) {
				this.bossDeathCount[2] = 0;
			}

			tempOffset = 160;
		}

		if (this.boss[2][6] == true) {
			tempOffset = 80;
			this.boss[2][6] = false;
		}

		ctx.save();
		ctx.translate(-5, -7);
		
		if (this.turretCount < 1) {
			ctx.drawImage(b1, 285 + tempOffset, 742, 11, 15, x, y, 11, 15);
		} else if (this.turretCount >= 1 && this.turretCount < 7) {
			ctx.drawImage(b1, 285 + tempOffset, 758, 15, 15, x, y, 15, 15);
		} else if (this.turretCount >= 7 && this.turretCount < 13) {
			ctx.drawImage(b1, 285 + tempOffset, 774, 19, 15, x, y, 19, 15);
		} else if (this.turretCount >= 13 && this.turretCount < 19) {
			ctx.drawImage(b1, 285 + tempOffset, 790, 23, 15, x, y, 23, 15);
		} else if (this.turretCount >= 19 && this.turretCount < 25) {
			ctx.drawImage(b1, 285 + tempOffset, 806, 27, 15, x, y, 27, 15);
		} else if (this.turretCount >= 25 && this.turretCount < 31) {
			ctx.drawImage(b1, 285 + tempOffset, 822, 31, 15, x, y, 31, 15);
		} else if (this.turretCount >= 37 && this.turretCount < 43) {
			ctx.drawImage(b1, 285 + tempOffset, 838, 35, 15, x, y, 35, 15);
		} else if (this.turretCount >= 43 && this.turretCount < 49) {
			ctx.drawImage(b1, 285 + tempOffset, 854, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 49 && this.turretCount < 55) {
			ctx.drawImage(b1, 285 + tempOffset, 870, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 55 && this.turretCount < 61) {
			ctx.drawImage(b1, 285 + tempOffset, 886, 39, 15, x, y, 39, 15);
		} else if (this.turretCount >= 61 && this.turretCount < 67) {
			ctx.drawImage(b1, 285 + tempOffset, 903, 39, 17, x, y, 39, 17);
		} else if (this.turretCount >= 67 && this.turretCount < 73) {
			ctx.drawImage(b1, 285 + tempOffset, 920, 39, 19, x, y, 39, 19);
		} else if (this.turretCount >= 73 && this.turretCount < 79) {
			ctx.drawImage(b1, 285 + tempOffset, 940, 39, 20, x, y, 39, 20);
		} else if (this.turretCount >= 79) {
			ctx.drawImage(b1, 285 + tempOffset, 961, 39, 21, x, y, 39, 21);
		}

		ctx.restore();
	},
	drawProjectile: function (x, y, type) {
		ctx.save();
		
		if (x < 314 || x > -10 || y < 230 || y > -10) {
			if (type == 1) {
				if (this.projectilesDisplayed == 1) {
					this.projectileCounter1++
				} else if (this.projectilesDisplayed == 2) {
					this.projectileCounter1 += 0.5;
				} else if (this.projectilesDisplayed == 3) {
					this.projectileCounter1 += 0.33;
				} else if (this.projectilesDisplayed == 4) {
					this.projectileCounter1 += 0.25;
				} else if (this.projectilesDisplayed == 5) {
					this.projectileCounter1 += 0.2;
				} else if (this.projectilesDisplayed == 6) {
					this.projectileCounter1 += 0.16;
				} else if (this.projectilesDisplayed == 7) {
					this.projectileCounter1 += 0.14;
				} else if (this.projectilesDisplayed == 8) {
					this.projectileCounter1 += 0.12;
				} else if (this.projectilesDisplayed == 9) {
					this.projectileCounter1 += 0.11;
				} else if (this.projectilesDisplayed == 10) {
					this.projectileCounter1 += 0.1;
				}

				if (this.projectileCounter1 < 6) {
					ctx.translate(-3, -2);
					ctx.drawImage(en, 257, 159, 6, 4, x, y, 6, 4)
				} else if (this.projectileCounter1 >= 6 && this.projectileCounter1 < 11) {
					ctx.translate(-2, -2);
					ctx.drawImage(en, 264, 159, 4, 4, x, y, 4, 4)
				} else if (this.projectileCounter1 >= 11 && this.projectileCounter1 < 16) {
					ctx.translate(-2, -3);
					ctx.drawImage(en, 269, 159, 4, 6, x, y, 4, 6)
				} else if (this.projectileCounter1 >= 16 && this.projectileCounter1 < 21) {
					ctx.translate(-2, -2);
					ctx.drawImage(en, 274, 159, 4, 4, x, y, 4, 4)
				}
			} else if (type == 2) {
				if (this.projectilesDisplayed == 1) {
					this.projectileCounter2++
				} else if (this.projectilesDisplayed == 2) {
					this.projectileCounter2 += 0.5;
				} else if (this.projectilesDisplayed == 3) {
					this.projectileCounter2 += 0.33;
				} else if (this.projectilesDisplayed == 4) {
					this.projectileCounter2 += 0.25;
				} else if (this.projectilesDisplayed == 5) {
					this.projectileCounter2 += 0.2;
				} else if (this.projectilesDisplayed == 6) {
					this.projectileCounter2 += 0.16;
				} else if (this.projectilesDisplayed == 7) {
					this.projectileCounter2 += 0.14;
				} else if (this.projectilesDisplayed == 8) {
					this.projectileCounter2 += 0.12;
				} else if (this.projectilesDisplayed == 9) {
					this.projectileCounter2 += 0.11;
				} else if (this.projectilesDisplayed >= 10) {
					this.projectileCounter2 += 0.1;
				}
				
				if (this.projectileCounter2 < 6) {
					ctx.translate(-4, -4);
					ctx.drawImage(en, 257, 148, 8, 8, x, y, 8, 8)
				} else if (this.projectileCounter2 >= 6 && this.projectileCounter2 < 11) {
					ctx.translate(-5, -5);
					ctx.drawImage(en, 266, 148, 10, 10, x, y, 10, 10)
				} else if (this.projectileCounter2 >= 11 && this.projectileCounter2 < 16) {
					ctx.translate(-5, -5);
					ctx.drawImage(en, 277, 148, 10, 10, x, y, 10, 10)
				} else if (this.projectileCounter2 >= 16 && this.projectileCounter2 < 21) {
					ctx.translate(-4, -4);
					ctx.drawImage(en, 288, 148, 8, 8, x, y, 8, 8)
				}
			} else if (type == 3) {
				if (this.projectilesDisplayed == 1) {
					this.projectileCounter3++
				} else if (this.projectilesDisplayed == 2) {
					this.projectileCounter3 += 0.5;
				} else if (this.projectilesDisplayed == 3) {
					this.projectileCounter3 += 0.33;
				} else if (this.projectilesDisplayed == 4) {
					this.projectileCounter3 += 0.25;
				} else if (this.projectilesDisplayed == 5) {
					this.projectileCounter3 += 0.2;
				} else if (this.projectilesDisplayed == 6) {
					this.projectileCounter3 += 0.16;
				} else if (this.projectilesDisplayed == 7) {
					this.projectileCounter3 += 0.14;
				} else if (this.projectilesDisplayed == 8) {
					this.projectileCounter3 += 0.12;
				} else if (this.projectilesDisplayed == 9) {
					this.projectileCounter3 += 0.11;
				} else if (this.projectilesDisplayed >= 10) {
					this.projectileCounter3 += 0.1;
				}
				
				if (this.projectileCounter3 < 6) {
					ctx.translate(-5, -5);
					ctx.drawImage(en, 257, 133, 10, 10, x, y, 10, 10)
				} else if (this.projectileCounter3 >= 6 && this.projectileCounter3 < 11) {
					ctx.translate(-4, -7);
					ctx.drawImage(en, 268, 133, 8, 14, x, y, 8, 14)
				} else if (this.projectileCounter3 >= 11 && this.projectileCounter3 < 16) {
					ctx.translate(-5, -5);
					ctx.drawImage(en, 277, 133, 10, 10, x, y, 10, 10)
				} else if (this.projectileCounter3 >= 16 && this.projectileCounter3 < 21) {
					ctx.translate(-7, -4);
					ctx.drawImage(en, 288, 133, 14, 8, x, y, 14, 8)
				}
			}
		}

		ctx.restore();

		if (this.projectileCounter1 >= 20) {
			this.projectileCounter1 = 0;
		}

		if (this.projectileCounter2 >= 20) {
			this.projectileCounter2 = 0;
		}

		if (this.projectileCounter3 >= 20) {
			this.projectileCounter3 = 0;
		}
	},
	patternHeliS1: function (index) {
		let xLimit;

		switch (level.scrollPos) {
			case 2289:
				this.unitsOnScreen.push(this.heliS[index]);
				this.displayedHeliS += 1;
				this.unitsOnScreen.find(function (unit) {
					/*if (unit[0] == this.heliS[index][0]) {
						unit = this.heliS[index];
						//unit[2] = this.heliS[index][2];
					}*/
				});
			break;

			/*case 2228:
				for (let x = 0; x < this.unitsOnScreen.length; x++) {
					if (this.unitsOnScreen[x][0] == "hs1" || this.unitsOnScreen[x][0] == "hs2" || this.unitsOnScreen[x][0] == "hs3") {
						this.unitsOnScreen.splice(this.unitsOnScreen[x], 1);
						this.displayedHeliS -= 1;
						this.velX[index] = 2;
						this.velY[index] = 2;
					}
				}
			break;*/
		}

		if (index == 0) {
			xLimit = 110;
		} else if (index == 1) {
			xLimit = 139;
		} else if (index == 2) {
			xLimit = 170;
		}

		if (level.scrollPos <= 2288 /*&& level.scrollPos >= 2229 || this.heliS[index][7] == false*/) {
			/*if (this.heliS[index][2] > 50) {
				this.velX[index] -= 0.1;
				this.velY[index] -= 0.1;

				if (this.heliS[index][1] == xLimit) {
					this.velX[index] = 0;
					if (this.velY[index] > -2) {
						this.velY[index] -= 0.1;
					}
				}
			}*/

			//this.heliS[index][1] -= this.velX[index];
			//this.heliS[index][2] += this.velY[index];
			this.drawHeliS(this.heliS[index][1], this.heliS[index][2], index);
		}
	},
	patternHeliS2: function (index) {
		let xLimit;

		switch (level.scrollPos) {
			case 2220:
				this.unitsOnScreen.push(this.heliS[index]);
				this.displayedHeliS += 1;
			break;

			case 2103:
				for (let x = 0; x < this.unitsOnScreen.length; x++) {
					if (this.unitsOnScreen[x][0] == "hs4" || this.unitsOnScreen[x][0] == "hs5" || this.unitsOnScreen[x][0] == "hs6") {
						this.unitsOnScreen.splice(this.unitsOnScreen[x], 1);
						this.displayedHeliS -= 1;
						this.velX[index] = 2;
						this.velY[index] = 2;
					}
				}
			break;
		}

		if (index == 3) {
			xLimit = 194;
		} else if (index == 4) {
			xLimit = 165;
		} else if (index == 5) {
			xLimit = 134;
		}

		if (level.scrollPos <= 2220 && level.scrollPos >= 2105 || this.heliS[index][7] == false) {
			if (this.heliS[index][2] > 50 && this.velX[index] > 0) {
				this.velX[index] -= 0.1;
				this.velY[index] -= 0.1;

				if (this.velX[index] <= 0) {
					this.velX[index] = 0;
					this.velY[index] -= 1.8;
				}
			}

			this.heliS[index][1] += this.velX[index];
			this.heliS[index][2] += this.velY[index];
			this.drawHeliS(this.heliS[index][1], this.heliS[index][2], index);
		}
	},
	patternHeliL: function () {
		switch (level.scrollPos) {
			case 2195:
				enemies.unitsOnScreen.push(enemies.miniBoss[0]);
				enemies.unitsOnScreen.find(function (unit) {
					if (unit[0] == "hl") {
						unit[0][1] = enemies.miniBoss[0][1];
						unit[0][2] = enemies.miniBoss[0][2];
					}
				});
			break;

			case 2153:
				for (let x = 0; x <= 1; x++) {
					enemies.projectilesOnScreen.push(["ps" + (enemies.projectilesOnScreen.length).toString(), enemies.miniBoss[0][1], enemies.miniBoss[0][2] + 20, 4, 4, true]);
				}
			break;

			case 2107:
				for (let x = 0; x <= 1; x++) {
					enemies.projectilesOnScreen.push(["ps" + (enemies.projectilesOnScreen.length).toString(), enemies.miniBoss[0][1], enemies.miniBoss[0][2] + 20, 4, 4, true]);
				}
			break;

			case 2091:
				for (let x = 0; x <= 1; x++) {
					enemies.projectilesOnScreen.push(["ps" + (enemies.projectilesOnScreen.length).toString(), enemies.miniBoss[0][1], enemies.miniBoss[0][2] + 20, 4, 4, true]);
				}
			break;

			case 1816:
				for (let x = 0; x < this.unitsOnScreen.length; x++) {
					if (this.unitsOnScreen[x][0] == "hl") {
						this.unitsOnScreen.splice(this.unitsOnScreen[x], 1);
					}
				}
			break;
		}

		if (level.scrollPos <= 2195 && level.scrollPos >= 1817 && enemies.miniBoss[0][7] != false) {		
			enemies.drawHeliL(enemies.miniBoss[0][1], enemies.miniBoss[0][2]);
			
			if (this.miniBoss[0][7] == true) {
				enemies.miniBoss[0][2] += 0.4;
			}

			if (level.scrollPos <= 2154)  {
				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps0" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] -= 0.35;
							projectile[2] += 1.5;
						}
					}
				});

				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps1" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] += 0.35;
							projectile[2] += 1.5;
						}
					}
				});
			}

			if (level.scrollPos <= 2107)  {
				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps2" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] -= 0.35;
							projectile[2] += 1.5;
						}
					}
				});

				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps3" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] += 0.35;
							projectile[2] += 1.5;
						}
					}
				});
			}

			if (level.scrollPos <= 2091)  {
				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps4" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] -= 0.35;
							projectile[2] += 1.5;
						}
					}
				});

				enemies.projectilesOnScreen.find(function(projectile) {
					if (projectile[0] == "ps5" && projectile[5] == true) {
						enemies.drawProjectile(projectile[1], projectile[2], 1);
						if (projectile[2] < 310) {
							projectile[1] += 0.35;
							projectile[2] += 1.5;
						}
					}
				});
			}
		}
	},
	patternTanks: function () {
		switch (level.scrollPos) {
			case 1928:
				this.unitsOnScreen.push(this.vehicles[0]);
				enemies.unitsOnScreen.find(function(unit) {
					if (unit[0] == "st0") {
						unit[0][1] = enemies.vehicles[0][1];
						unit[0][2] = enemies.vehicles[0][2];
					}
				});
			break;

			case 1863:
				this.unitsOnScreen.push(this.vehicles[1]);
				enemies.unitsOnScreen.find(function(unit) {
					if (unit[0] == "st1") {
						unit[0][1] = enemies.vehicles[1][1];
						unit[0][2] = enemies.vehicles[1][2];
					}
				});
			break;

			case 1798:
				this.unitsOnScreen.push(this.vehicles[2]);
				enemies.unitsOnScreen.find(function(unit) {
					if (unit[0] == "st2") {
						unit[0][1] = enemies.vehicles[2][1];
						unit[0][2] = enemies.vehicles[2][2];
					}
				});
			break;
		}

		if (level.scrollPos <= 1928) {
			this.drawTank(this.vehicles[0][1], this.vehicles[0][2], 0);
		}

		if (level.scrollPos <= 1863) {
			this.drawTank(this.vehicles[1][1], this.vehicles[1][2], 1);
		}

		if (level.scrollPos <= 1798) {
			this.drawTank(this.vehicles[2][1], this.vehicles[2][2], 2);
		}
	},
	patternPagodaS: function () {
		switch (level.scrollPos) {
			case 1023:
				this.unitsOnScreen.push(this.miniBoss[4]);
				this.unitsOnScreen.push(this.miniBoss[5]);
			break;
		}

		if (level.scrollPos <= 1174 && level.scrollPos > 1022) {
			this.miniBoss[2][1] += 0.5;
			this.miniBoss[3][1] += 0.5;

			if (level.scrollPos == 1082) {
				this.pagodaInc = 1;
			}

			if (level.scrollPos <= 1053) {
				
				if (this.pagodaSvelY < 4) {
					this.pagodaSvelY += 0.2;
				}

				this.miniBoss[2][1] -= this.pagodaSvelY;
				this.miniBoss[3][1] -= this.pagodaSvelY;
			}

			this.drawPagodaS(this.miniBoss[2][0], this.miniBoss[2][1]);
			this.drawPagodaS(this.miniBoss[3][0], this.miniBoss[3][1]);
		} else if (level.scrollPos <= 1022) {
			this.pagodaSvelY = 2.5;

			this.miniBoss[2][1] += this.pagodaSvelY;
			this.miniBoss[3][1] += this.pagodaSvelY;

			this.drawPagodaL(this.miniBoss[2][0], this.miniBoss[2][1], 0);
			this.drawPagodaL(this.miniBoss[3][0], this.miniBoss[3][1], 1);
		}
	},
	patternRoboTower: function () {
		if (level.scrollPos <= 884.5) {
			this.roboTowerOffset += 0.5;
			this.drawRoboTower(136, this.roboTowerOffset);

			if (level.scrollPos == 777.5) {
				this.roboTowerInc = 1;
			}
		}
	},
	patternBoss: function () {
		if (this.bossMoving == true) {
			if (this.bossMoveInc < 240) {
				this.bossMoveInc += 3;

				if (this.bossMoveInc >= 235 && this.bossMoveInc <= 238) {
					level.drawingStation = false;
				}
			} else {
				this.bossMoving = false;
				this.headTransform = true;
			}
		}

		if (this.bossEntranceCount == 275) {
			
			this.unitsOnScreen.push(this.boss[0], this.boss[1], this.boss[2]);
			// 												push coords
		} else if (this.bossEntranceCount > 275) {
			this.headTransform = false;
			this.bossMainCount++;

			for (let x = 0; x < this.unitsOnScreen.length; x++) {
				if (this.unitsOnScreen[x][0] == "bh") {
					this.unitsOnScreen[x][1] = this.boss[0][1];
					this.unitsOnScreen[x][2] = this.boss[0][2];
				}
			}
		}

		if (this.bossMainCount > 0 && this.bossMainCount < 50) {
			this.topTurretOpenClose = true;
		} else if (this.bossMainCount >= 69 && this.bossMainCount < 188) {
			this.bossHeadOpenClose = true;

			if (this.bossMainCount == 105) {
				this.headPattern = true;
			}
		} else if (this.bossMainCount >= 188) {
			this.bossHeadOpenClose = false;
		}

		if (this.topTurretFire == true) {
			if (this.topTurretFireCount < 20) {
				this.topTurretFireCount++;

				if (this.topTurretFireCount == 15 && this.topTurretPattern != true) {
					this.projectilesOnScreen.push(
						[153, 22, 2], [156, 23, 2], [158, 25, 2], [159, 28, 2], [158, 31, 2], [156, 33, 2],
						[153, 34, 2], [150, 33, 2], [148, 31, 2], [147, 28, 2], [148, 25, 2], [150, 23, 2]
					);

					this.topTurretPattern = true;
				}
			} else {
				this.topTurretOpenClose = false;
			}
		}

		if (this.bossHeadOpenClose == true) {
			if (this.bossHeadCount < 18) {
				this.bossHeadCount++;
			}
		} else {
			if (this.bossHeadCount > 0) {
				this.bossHeadCount--;
			}
		}

		this.drawBoss(153, 299 - this.bossMoveInc);
	},
	patternProjectilesBoss: function () {
		if (this.topTurretPattern == true) {
			this.bossProjectilesInc[0] = 3;
			this.bossProjectilesInc[1] = 2.65;
			this.bossProjectilesInc[2] = 1.65;

			this.drawProjectile(this.projectilesOnScreen[0][0], this.projectilesOnScreen[0][1] -= this.bossProjectilesInc[0], 2);
			this.drawProjectile(this.projectilesOnScreen[1][0] += this.bossProjectilesInc[2], this.projectilesOnScreen[1][1] -= this.bossProjectilesInc[1], 2);
			this.drawProjectile(this.projectilesOnScreen[2][0] += this.bossProjectilesInc[1], this.projectilesOnScreen[2][1] -= this.bossProjectilesInc[2], 2);
			this.drawProjectile(this.projectilesOnScreen[3][0] += this.bossProjectilesInc[0], this.projectilesOnScreen[3][1], 2);
			this.drawProjectile(this.projectilesOnScreen[4][0] += this.bossProjectilesInc[1], this.projectilesOnScreen[4][1] += this.bossProjectilesInc[2], 2);
			this.drawProjectile(this.projectilesOnScreen[5][0] += this.bossProjectilesInc[2], this.projectilesOnScreen[5][1] += this.bossProjectilesInc[1], 2);
			this.drawProjectile(this.projectilesOnScreen[6][0], this.projectilesOnScreen[6][1] += this.bossProjectilesInc[0], 2);
			this.drawProjectile(this.projectilesOnScreen[7][0] -= this.bossProjectilesInc[2], this.projectilesOnScreen[7][1] += this.bossProjectilesInc[1], 2);
			this.drawProjectile(this.projectilesOnScreen[8][0] -= this.bossProjectilesInc[1], this.projectilesOnScreen[8][1] += this.bossProjectilesInc[2], 2);
			this.drawProjectile(this.projectilesOnScreen[9][0] -= this.bossProjectilesInc[0], this.projectilesOnScreen[9][1], 2);
			this.drawProjectile(this.projectilesOnScreen[10][0] -= this.bossProjectilesInc[1], this.projectilesOnScreen[10][1] -= this.bossProjectilesInc[2], 2);
			this.drawProjectile(this.projectilesOnScreen[11][0] -= this.bossProjectilesInc[2], this.projectilesOnScreen[11][1] -= this.bossProjectilesInc[1], 2);

			if (this.projectilesOnScreen[6][1] >= 322) {
				this.topTurretPattern = false;
			}
		}


		if (this.topTurretPattern == false) {
			for (let x = 0; x < this.projectilesOnScreen.length; x++) {
				if (this.projectilesOnScreen[x][2] == 2) {
					this.projectilesOnScreen.splice(this.projectilesOnScreen[x], 1);
				}
			}
		}

		/*if (this.headPattern == true) {
			//  										prez 18

			this.drawProjectile(155 + this.bossPatternProjectilesInc[0], 94 + this.bossPatternProjectilesInc[1], 1);
		}*/
	}
}

const controlls = {
	left: false,
	right: false,
	up: false,
	down: false,
	fire: false,
	special: false,
	speedX: 2,
	speedY: 2,
	projectilePositionX1: 0,
	projectilePositionX2: 0,
	projectilePositionX3: 0,
	projectilePositionX4: 0,
	projectilePositionY1: 0,
	projectilePositionY2: 0,
	projectilePositionY3: 0,
	projectilePositionY4: 0,
	fireCount: 0,
	firing1: false,
	firing2: false,
	firing3: false,
	firing4: false,
	specialReverse: 0,
	keyCheck: function () {
		if (player.dead != true) {	
			if (this.left == true && this.right != true) {
				if (player.x >= 19) {
					player.x -= this.speedX;
				}
			} else {
				if (player.tiltCount < 0) {
					player.tiltCount += 1;
				}
			}

			if (this.right == true && this.left != true) {
				if (player.x <= 296 - player.width) {
					player.x += this.speedX;
				}
			} else {
				if (player.tiltCount > 0) {
					player.tiltCount -= 1;
				}
			}

			if (this.up == true && this.down != true) {
				if (player.y >= 48) {
					player.y -= this.speedY;
					this.specialReverse += this.speedY;
				}
			}

			if (this.down == true && this.up != true) {
				if (player.y < 196) {
					player.y += this.speedY;
					this.specialReverse -= this.speedY;
				}
			}

			if (this.fire == true) {
				this.fireCount++;

				switch (this.fireCount) {
					case 1:
						controlls.projectilePositionX1 = player.x;
						controlls.projectilePositionY1 = player.y;
						controlls.firing1 = true;
					break;

					case 7:
						controlls.projectilePositionX2 = player.x;
						controlls.projectilePositionY2 = player.y;
						controlls.firing2 = true;
					break;

					case 13:
						controlls.projectilePositionX3 = player.x;
						controlls.projectilePositionY3 = player.y;
						controlls.firing3 = true;
					break;

					case 19:
						controlls.projectilePositionX4 = player.x;
						controlls.projectilePositionY4 = player.y;
						controlls.firing4 = true;
					break;
				}

				if (this.fireCount > 1) {
					player.projectileCollision(controlls.projectilePositionX1, controlls.projectilePositionY1, 9, 33, 4, 2, 0);

					if (player.power == 2) {
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 277, 14, 1);
						this.projectilePositionY1 -= player.projectileSpeed;
					} else if (player.power == 3) {
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 325, 15, 2);
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 390, 14, 2);
						this.projectilePositionY1 -= player.projectileSpeed;
					} else if (player.power == 4) {
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 325, 15, 3);
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1 - 10, 277, 14, 3);
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 390, 14, 3);
						this.projectilePositionY1 -= player.projectileSpeed;
					} else {
						player.drawProjectiles(this.projectilePositionX1, this.projectilePositionY1, 0, 0, 0);
						this.projectilePositionY1 -= player.projectileSpeed;
					}
					
					if (this.projectilePositionY1 <= 2) {
						this.firing1 = false;
					}
				}

				if (this.fireCount > 7) {
					player.projectileCollision(controlls.projectilePositionX2, controlls.projectilePositionY2, 9, 33, 4, 2, 1);

					if (player.power == 2) {
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 277, 14);
						controlls.projectilePositionY2 -= player.projectileSpeed;
					} else if (player.power == 3) {
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 390, 14);
						controlls.projectilePositionY2 -= player.projectileSpeed;
					} else if (player.power == 4) {
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2 - 10, 277, 14);
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 390, 14);
						controlls.projectilePositionY2 -= player.projectileSpeed;
					} else {
						player.drawProjectiles(controlls.projectilePositionX2, controlls.projectilePositionY2, 0, 0);
						controlls.projectilePositionY2 -= player.projectileSpeed;
					}

					if (controlls.projectilePositionY2 <= 2) {
						this.firing2 = false;
					}
				}

				if (this.fireCount > 13) {
					player.projectileCollision(controlls.projectilePositionX3, controlls.projectilePositionY3, 9, 33, 4, 2, 2);

					if (player.power == 2) {
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 277, 14);
						controlls.projectilePositionY3 -= player.projectileSpeed;
					} else if (player.power == 3) {
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 390, 14);
						controlls.projectilePositionY3 -= player.projectileSpeed;
					} else if (player.power == 4) {
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3 - 10, 277, 14);
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 390, 14);
						controlls.projectilePositionY3 -= player.projectileSpeed;
					} else {
						player.drawProjectiles(controlls.projectilePositionX3, controlls.projectilePositionY3, 0, 0);
						controlls.projectilePositionY3 -= player.projectileSpeed;
					}

					if (controlls.projectilePositionY3 <= 2) {
						this.firing3 = false;
					}
				}

				if (this.fireCount > 19) {
					player.projectileCollision(controlls.projectilePositionX4, controlls.projectilePositionY4, 9, 33, 4, 2, 3);

					if (player.power == 2) {
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 277, 14);
						controlls.projectilePositionY4 -= player.projectileSpeed;
					} else if (player.power == 3) {
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 390, 14);
						controlls.projectilePositionY4 -= player.projectileSpeed;
					} else if (player.power == 4) {
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4 - 10, 277, 14);
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 390, 14);
						controlls.projectilePositionY4 -= player.projectileSpeed;
					} else {
						player.drawProjectiles(controlls.projectilePositionX4, controlls.projectilePositionY4, 0, 0);
						controlls.projectilePositionY4 -= player.projectileSpeed;
					}

					if (controlls.projectilePositionY4 <= 2) {
						this.firing4 = false;
					}
				}

				if (this.firing1 == false && this.firing2 == false && this.firing3 == false && this.firing4 == false) {
					this.fireCount = 0;
					this.fire = false;
				}
			}

			if (this.special == true && player.firingSpecial != true) {
				player.drawSpecial();
			}
		}
	}
}

function draw () {
	
	canvas.width = 304;
	canvas.height = 224;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	level.drawBg();
	if (level.drawingStation == true) {
		level.drawStation();
	}
	
	enemies.patternBoss();
	if (enemies.bossEnterDone == false) {
		enemies.drawBossEntrance(154, 21);
	}
		
	enemies.patternHeliL();
	/*enemies.patternHeliS1(0);
	enemies.patternHeliS1(1);
	enemies.patternHeliS1(2);*/
	//enemies.patternHeliS2(3);
	//enemies.patternHeliS2(4);
	//enemies.patternHeliS2(5);
	
	//enemies.patternTanks();

	//enemies.patternPagodaS();
	//enemies.patternRoboTower();
	level.patternBuilding();
	
	if (level.scrollPos <= 2287) {

	}

	if (player.hitDetected[0] == true) {
		level.drawHit1(level.hitCoords[0], level.hitCoords[1] - 21);
	}

	if (player.hitDetected[1] == true) {
		level.drawHit2(level.hitCoords[0], level.hitCoords[1] - 21);
	}

	if (player.hitDetected[2] == true) {
		level.drawHit3(level.hitCoords[0], level.hitCoords[1] - 21);
	}

	if (player.hitDetected[3] == true) {
		level.drawHit4(level.hitCoords[0], level.hitCoords[1] - 21);
	}

	if (level.explosion1 == true) {
		for (let x = 0; x < level.explosion1Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion1Coords[x][1] += 0.5;
			}

			level.drawExplosion1(level.explosion1Coords[x][0], level.explosion1Coords[x][1] + 15, x);
		}
	}

	if (level.explosion2 == true) {
		for (let x = 0; x < level.explosion2Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion2Coords[x][1] += 0.5;
			}

			level.drawExplosion2(level.explosion2Coords[x][0], level.explosion2Coords[x][1] + 15, x);
		}
	}

	if (level.explosion2v2 == true) {
		for (let x = 0; x < level.explosion2v2Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion2v2Coords[x][1] += 0.5;
			}

			level.drawExplosion2v2(level.explosion2v2Coords[x][0], level.explosion2v2Coords[x][1] + 15, x);
		}
	}

	if (level.explosion3 == true) {
		for (let x = 0; x < level.explosion3Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion3Coords[x][1] += 0.5;
			}

			level.drawExplosion3(level.explosion3Coords[x][0], level.explosion3Coords[x][1], x);
		}
	}

	if (level.explosion3v2 == true) {
		for (let x = 0; x < level.explosion3v2Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion3v2Coords[x][1] += 0.5;
			}

			level.drawExplosion3v2(level.explosion3v2Coords[x][0], level.explosion3v2Coords[x][1], x);
		}
	}

	if (level.explosion4 == true) {
		for (let x = 0; x < level.explosion4Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion4Coords[x][1] += 0.5;
			}

			level.drawExplosion4(level.explosion4Coords[x][0], level.explosion4Coords[x][1], x);
		}
	}

	if (level.explosion5 == true) {
		for (let x = 0; x < level.explosion5Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion5Coords[x][1] += 0.5;
			}

			level.drawExplosion5(level.explosion5Coords[x][0], level.explosion5Coords[x][1], x);
		}
	}

	if (level.explosion6 == true) {
		for (let x = 0; x < level.explosion6Coords.length; x++) {
			if (level.scrollPos != 550) {
				level.explosion6Coords[x][1] += 0.5;
			}

			level.drawExplosion6(level.explosion6Coords[x][0], level.explosion6Coords[x][1], x);
		}
	}

	if (level.explosionEx == true) {
		if (level.scrollPos != 550) {
			level.explosionExCoords[x][1] += 0.5;
		}

		level.drawExplosionEx(level.explosionExCoords[0][0], level.explosionExCoords[0][1]);
	}

	if (level.drawingStation == false) {
		level.bossExplosionsSequence();
	}

	enemies.patternProjectilesBoss();
	controlls.keyCheck();
	player.craftCollision(player.x, player.y, 4, player.height, 5, 2);
	player.draw();	
	level.drawFg();

	enemies.projectilesDisplayed = enemies.projectilesOnScreen.length;
	requestAnimationFrame(draw);
}

window.addEventListener("keydown", function (key) {

	//console.log(key.keyCode);
	
	if (player.transition != true) {
		if (key.keyCode == 37) {
			controlls.left = true;
			if (player.tiltCount > -50) {
				player.tiltCount -= 6;
			}
		}

		if (key.keyCode == 39) {
			controlls.right = true;
			if (player.tiltCount < 50) {
				player.tiltCount += 6;
			}
		}

		if (key.keyCode == 38) {
			controlls.up = true;
		}

		if (key.keyCode == 40) {
			controlls.down = true;
		}

		if (key.keyCode == 65 && controlls.fire != true) {
			controlls.fire = true;
		}

		if (key.keyCode == 83 && player.bombs > 0) {
			controlls.special = true;
		}

		if (key.keyCode == 51 && player.credits.join("") != "99") {
			player.credits[1] += 1;
			
			if (credit.currentTime > 0) {
				credit.currentTime = 0;
				credit.play();
			} else {
				credit.play();
			}

			if (player.credits[1] == 10) {
				player.credits[1] = 0;
				player.credits[0] += 1;
			}
		}
	}
});

window.addEventListener("keyup", function (key) {

	if (key.keyCode == 37) {
		controlls.left = false;
	}

	if (key.keyCode == 39) {
		controlls.right = false;
	}

	if (key.keyCode == 38) {
		controlls.up = false;
	}

	if (key.keyCode == 40) {
		controlls.down = false;
	}

	/*if (key.keyCode == 65) {
		controlls.fire = false;
	}*/
});

window.onclick = () => {
	//console.log(controlls.projectilePositionY1, level.hitCoords[0][1]);
	console.log(enemies.projectilesOnScreen)
}

window.onload = draw();