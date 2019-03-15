//
//
//

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const pi = new Image();
const l1 = new Image();
const en = new Image();
pi.src = "img/pi.png"
l1.src = "img/l1.png";
en.src = "img/en.png";

const level = {
	scoreOffset: 8,
	livesOffset: 8,
	bombOffset: 16,
	creditOffset: 7,
	smoothing: false,
	scrollSpeed: 0.5,
	scrollPos: 2311,
	drawBg: function () {
		this.scrollPos -= 0;//this.scrollSpeed
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
	enemyCollision: function (x1, y1, x2, y2) {
		if (x1 + Math.floor(player.width / 4) > x2 &&
			x1 - Math.floor(player.width / 4) < x2 &&
			y1 - Math.floor(player.height / 2) < y2 &&
			y1 + Math.floor(player.height / 2) > y2) {
			player.drawDeath();
		}
	}
}

const player = {
	x: 140,
	y: 196,
	width: 21,
	height: 31,
	tiltCount: 0,
	projectileSpeed: 7,
	projectileCounter: 0,
	firingSpecial: false,
	specialCount: 0,
	specialMove: 96,
	power: 1,
	lives: 2,
	bombs: 2,
	credits: [0, 0],
	score: 0,
	transition: false,
	dead: false,
	deathCount: 0,
	thrusters: 0,
	draw: function () {
		if (this.dead != true) {
		this.thrusters++;
		ctx.save();
		ctx.translate(-10, -16);
			if (this.specialCount < 150) {
				if (player.tiltCount > -16 && player.tiltCount < 16) {
					this.width = 21;
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 32, 0, 21, this.height, this.x, this.y, 21, this.height);
					} else {
						ctx.drawImage(pi, 32, 32, 21, this.height + 1, this.x, this.y, 21, (this.height + 1));
					}
				} else if (player.tiltCount <= -16 && player.tiltCount > -32) {
					this.width = 17;
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 14, 0, 17, this.height, this.x, this.y, 17, this.height);
					} else {
						ctx.drawImage(pi, 14, 32, 17, this.height + 1, this.x, this.y, 17, (this.height + 1));
					}
				} else if (player.tiltCount <= -32) {
					this.width = 14;
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 0, 0, 13, this.height, this.x, this.y, 13, this.height);
					} else {
						ctx.drawImage(pi, 0, 32, 13, this.height + 1, this.x, this.y, 13, (this.height + 1));
					}
				} else if (player.tiltCount >= 16 && player.tiltCount < 32) {
					this.width = 17;
					if (this.thrusters < 5) {
						ctx.drawImage(pi, 54, 0, 18, this.height, this.x, this.y, 18, this.height);
					} else {
						ctx.drawImage(pi, 54, 32, 18, this.height + 1, this.x, this.y, 18, (this.height + 1));
					}
				} else if (player.tiltCount >= 32) {
					this.width = 14;
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
					ctx.drawImage(pi, 0, 65, 22, this.height + 1, this.x, this.y, 22, (this.height + 1));
				} else if (this.specialCount >= 152 && this.specialCount < 154) {
					ctx.drawImage(pi, 23, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 154 && this.specialCount < 156) {
					ctx.drawImage(pi, 46, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 156 && this.specialCount < 158) {
					ctx.drawImage(pi, 69, 65, 22, 30, this.x, this.y, 22, 30);
				} else if (this.specialCount >= 158 && this.specialCount < 160) {
					ctx.drawImage(pi, 92, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 160 && this.specialCount < 162) {
					ctx.drawImage(pi, 114, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 162 && this.specialCount < 164) {
					ctx.drawImage(pi, 136, 65, 21, 30, this.x, this.y, 21, 30);
				} else if (this.specialCount >= 164 && this.specialCount < 166) {
					ctx.drawImage(pi, 158, 65, 21, 30, this.x, this.y, 21, 30);
				}
			}

		ctx.restore();

		}
	},
	drawProjectiles: function (x, y, offset, w) {
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

				ctx.drawImage(pi, offset, 94, w, 41, x - 10.5, y - 16, w, 41);
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

				ctx.drawImage(pi, offset, 94, w, 41, x - 15.5, y - 16, w, 41);
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
			ctx.translate(-5, -16);
			ctx.drawImage(pi, 267, 102, 9, 32, x, y - 10, 9, 32);
		}

		ctx.restore();
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
					ctx.drawImage(pi, 424, 0, 53, 135, player.x - 26, player.y - 106, 53, 135);
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
			ctx.drawImage(pi, 130, 103, 32, 32, player.x + (32 + this.specialMove), player.y - (65 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 229, 108, 48, 13, player.x + (37 + this.specialMove), player.y - 6, 48, 13);
			ctx.drawImage(pi, 196, 103, 32, 32, player.x + (29 + this.specialMove), player.y + (34 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 186, 41, 13, 48, player.x - 6, player.y + (40 + this.specialMove), 13, 48);
			ctx.drawImage(pi, 163, 103, 32, 32, player.x - (62 + this.specialMove), player.y + (34 + this.specialMove), 32, 32);
			ctx.drawImage(pi, 229, 122, 48, 13, player.x - (85 + this.specialMove), player.y - 6, 48, 13);
			ctx.drawImage(pi, 97, 103, 32, 32, player.x - (66 + this.specialMove), player.y - (65 + this.specialMove), 32, 32);
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
	dead: false,
	heliCountS: 0,
	onScreen: false,
	explosionCounter1: 0,
	explosionCounter2: 0,
	explosionCounter3: 0,
	heliS: [
		[150, 90], [220, -30], [250, -30],
		[0, 0], [0, 0], [0, 0]
	],
	miniBoss: [
		[0, 0], [0, 0]
	],
	drawHeliS: function (x,y) {
		this.heliCountS += 1;

		ctx.save();
		ctx.translate(-15, -15);
		if (this.heliCountS < 5) {
			ctx.drawImage(en, 249, 0, 29, 30, x, y, 29, 30);
		} else {
			ctx.drawImage(en, 279, 0, 29, 29, x, y, 29, 29);
		}

		if (this.heliCountS == 10) {
			this.heliCountS = 0;
		}
		ctx.restore();
	},
	drawProjectiles: function (x, y, type) {
		if (type == 1) {
			ctx.save();
			ctx.translate(-1, -1);
			ctx.drawImage(en, 257, 160, 4, 4, x, y, 4, 4)
			ctx.restore();
		}
	},
	drawExplosion1: function (x, y) {
		this.explosionCounter1++;
		
		ctx.save();

		if (this.explosionCounter1 < 1) {
			ctx.translate(-13, -11);
			ctx.drawImage(en, 0, 251, 25, 22, x, y, 25, 22);
		} else if (this.explosionCounter1 >= 1 && this.explosionCounter1 < 4) {
			ctx.translate(-13, -14);
			ctx.drawImage(en, 26, 251, 25, 28, x, y, 25, 28);
		} else if (this.explosionCounter1 >= 4 && this.explosionCounter1 < 7) {
			ctx.translate(-13, -16);
			ctx.drawImage(en, 52, 251, 26, 31, x, y, 25, 31);
		} else if (this.explosionCounter1 >= 7 && this.explosionCounter1 < 10) {
			ctx.translate(-16, -18);
			ctx.drawImage(en, 79, 251, 31, 35, x, y, 31, 35);
		} else if (this.explosionCounter1 >= 10 && this.explosionCounter1 < 13) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 111, 251, 32, 38, x, y, 32, 38);
		} else if (this.explosionCounter1 >= 13 && this.explosionCounter1 < 16) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 144, 251, 32, 41, x, y, 32, 41);
		} else if (this.explosionCounter1 >= 16 && this.explosionCounter1 < 19) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 178, 251, 31, 40, x, y, 31, 40);
		} else if (this.explosionCounter1 >= 19 && this.explosionCounter1 < 22) {
			ctx.translate(-16, -22);
			ctx.drawImage(en, 210, 251, 31, 43, x, y, 31, 43);
		} else if (this.explosionCounter1 >= 22 && this.explosionCounter1 < 25) {
			ctx.translate(-15, -22);
			ctx.drawImage(en, 242, 251, 29, 43, x, y, 29, 43);
		} else if (this.explosionCounter1 >= 25 && this.explosionCounter1 < 28) {
			ctx.translate(-14, -22);
			ctx.drawImage(en, 272, 251, 28, 43, x, y, 28, 43);
		} else if (this.explosionCounter1 >= 28 && this.explosionCounter1 < 31) {
			ctx.translate(-13, -23);
			ctx.drawImage(en, 301, 251, 26, 45, x, y, 26, 45);
		} else if (this.explosionCounter1 >= 31 && this.explosionCounter1 < 34) {
			ctx.translate(-10, -23);
			ctx.drawImage(en, 328, 251, 20, 45, x, y, 20, 45);
		}

		ctx.restore();

		if (this.explosionCounter1 == 34) {
			this.explosionCounter1 = 0;
		}
	},
	drawExplosion2: function (x, y) {
		this.explosionCounter2++;

		ctx.save();
		if (this.explosionCounter2 < 1) {
			ctx.translate(-10, -12);
			ctx.drawImage(en, 0, 504, 20, 24, x, y, 20, 24);
		} else if (this.explosionCounter2 >= 1 && this.explosionCounter2 < 4) {
			ctx.translate(-12, -15);
			ctx.drawImage(en, 21, 504, 23, 29, x, y, 23, 29);
		} else if (this.explosionCounter2 >= 4 && this.explosionCounter2 < 7) {
			ctx.translate(-14, -17);
			ctx.drawImage(en, 45, 504, 29, 34, x, y, 29, 34);
		} else if (this.explosionCounter2 >= 7 && this.explosionCounter2 < 10) {
			ctx.translate(-15, -18);
			ctx.drawImage(en, 75, 504, 31, 35, x, y, 31, 35);
		} else if (this.explosionCounter2 >= 10 && this.explosionCounter2 < 13) {
			ctx.translate(-16, -18);
			ctx.drawImage(en, 107, 504, 32, 36, x, y, 32, 36);
		} else if (this.explosionCounter2 >= 13 && this.explosionCounter2 < 16) {
			ctx.translate(-16, -18);
			ctx.drawImage(en, 140, 504, 32, 37, x, y, 32, 37);
		} else if (this.explosionCounter2 >= 16 && this.explosionCounter2 < 19) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 173, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCounter2 >= 19 && this.explosionCounter2 < 22) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 206, 504, 32, 37, x, y, 32, 37);
		} else if (this.explosionCounter2 >= 22 && this.explosionCounter2 < 25) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 239, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCounter2 >= 25 && this.explosionCounter2 < 28) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 272, 504, 32, 39, x, y, 32, 39);
		} else if (this.explosionCounter2 >= 28 && this.explosionCounter2 < 31) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 305, 504, 32, 40, x, y, 32, 40);
		} else if (this.explosionCounter2 >= 31 && this.explosionCounter2 < 34) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 338, 504, 32, 38, x, y, 32, 38);
		} else if (this.explosionCounter2 >= 34 && this.explosionCounter2 < 37) {
			ctx.translate(-16, -18);
			ctx.drawImage(en, 371, 504, 32, 36, x, y, 32, 36);
		} else if (this.explosionCounter2 >= 37 && this.explosionCounter2 < 40) {
			ctx.translate(-16, -15);
			ctx.drawImage(en, 404, 504, 32, 29, x, y, 32, 29);
		} else if (this.explosionCounter2 >= 40 && this.explosionCounter2 < 43) {
			ctx.translate(-15, -16);
			ctx.drawImage(en, 437, 504, 30, 31, x, y, 30, 31);
		} else if (this.explosionCounter2 >= 43 && this.explosionCounter2 < 46) {
			ctx.translate(-12, -11);
			ctx.drawImage(en, 468, 504, 24, 22, x, y, 24, 22);
		}

		ctx.restore();
		
		if (this.explosionCounter2 == 46) {
			this.explosionCounter2 = 0;
		}
	},
	drawExplosion3: function (x, y) {
		this.explosionCounter3++;

		ctx.save();
		if (this.explosionCounter3 < 1) {
			ctx.translate(-14, -14);
			ctx.drawImage(en, 0, 297, 27, 27, x, y, 27, 27);
		} else if (this.explosionCounter3 >= 1 && this.explosionCounter3 < 4) {
			ctx.translate(-15, -16);
			ctx.drawImage(en, 28, 297, 29, 31, x, y, 29, 31);
		} else if (this.explosionCounter3 >= 4 && this.explosionCounter3 < 7) {
			ctx.translate(-15, -17);
			ctx.drawImage(en, 58, 297, 30, 34, x, y, 30, 34);
		} else if (this.explosionCounter3 >= 7 && this.explosionCounter3 < 10) {
			ctx.translate(-16, -19);
			ctx.drawImage(en, 89, 297, 32, 37, x, y, 32, 37);
		} else if (this.explosionCounter3 >= 10 && this.explosionCounter3 < 13) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 122, 297, 32, 41, x, y, 32, 41);
		} else if (this.explosionCounter3 >= 13 && this.explosionCounter3 < 16) {
			ctx.translate(-16, -20);
			ctx.drawImage(en, 155, 297, 32, 40, x, y, 32, 40);
		} else if (this.explosionCounter3 >= 16 && this.explosionCounter3 < 19) {
			ctx.translate(-16, -22);
			ctx.drawImage(en, 188, 297, 32, 41, x, y, 32, 41);
		} else if (this.explosionCounter3 >= 19 && this.explosionCounter3 < 22) {
			ctx.translate(-16, -22);
			ctx.drawImage(en, 221, 297, 31, 41, x, y, 31, 41);
		} else if (this.explosionCounter3 >= 22 && this.explosionCounter3 < 25) {
			ctx.translate(-15, -20);
			ctx.drawImage(en, 253, 297, 29, 40, x, y, 29, 40);
		} else if (this.explosionCounter3 >= 25 && this.explosionCounter3 < 28) {
			ctx.translate(-13, -18);
			ctx.drawImage(en, 283, 297, 25, 35, x, y, 25, 35);
		} else if (this.explosionCounter3 >= 28 && this.explosionCounter3 < 31) {
			ctx.translate(-10, -15);
			ctx.drawImage(en, 309, 297, 20, 30, x, y, 20, 30);
		} else if (this.explosionCounter3 >= 31 && this.explosionCounter3 < 34) {
			ctx.translate(-10, -15);
			ctx.drawImage(en, 330, 297, 20, 29, x, y, 20, 29);
		} else if (this.explosionCounter3 >= 34 && this.explosionCounter3 < 37) {
			ctx.translate(-16, -21);
			ctx.drawImage(en, 351, 297, 16, 27, x, y, 16, 27);
		}

		if (this.explosionCounter3 == 37) {
			this.explosionCounter3 = 0;
		}

		ctx.restore();
	},
	pattern1: function (x) {
		if (this.heliS[0][0] > 100) {
			this.heliS[0][0] -= 1;
			this.heliS[0][1] += 1;
		} else {
			if (this.heliS[0][1] > -30) {
				this.heliS[0][1] -= 1;
			}
		}
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
	accel: 10,
	projectilePositionX1: 0,
	projectilePositionX2: 0,
	projectilePositionX3: 0,
	projectilePositionX4: 0,
	projectilePositionY1: 0,
	projectilePositionY2: 0,
	projectilePositionY3: 0,
	projectilePositionY4: 0,
	fireCount: 0,
	fireDone1: false,
	fireDone2: false,
	fireDone3: false,
	fireDone4: false,
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

				if (this.fireCount > 0) {
					if (player.power == 2) {
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 277, 14);
						controlls.projectilePositionY1 -= player.projectileSpeed;
					} else if (player.power == 3) {
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 390, 14);
						controlls.projectilePositionY1 -= player.projectileSpeed;
					} else if (player.power == 4) {
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 325, 15);
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1 - 10, 277, 14);
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 390, 14);
						controlls.projectilePositionY1 -= player.projectileSpeed;
					} else {
						player.drawProjectiles(controlls.projectilePositionX1, controlls.projectilePositionY1, 0, 0);
						controlls.projectilePositionY1 -= player.projectileSpeed;
					}
					
					if (controlls.projectilePositionY1 <= 2) {
						this.firing1 = false;
					}
				}

				if (this.fireCount > 6) {
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

				if (this.fireCount > 12) {
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

				if (this.fireCount > 18) {
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

				if (this.firing1 == false && this.firing2 == false && this.firing3 == false && this.firing4 == false && this.fireCount != 0) {
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
	controlls.keyCheck();

	if (player.y < 180) {
		
		//enemies.pattern1(enemies.heliS[0][0], enemies.heliS[0][1]);
		//enemies.drawHeliS(enemies.heliS[0][0], enemies.heliS[0][1]);
		enemies.drawProjectiles(enemies.heliS[0][0], enemies.heliS[0][1], 1);
		level.enemyCollision(player.x, player.y, enemies.heliS[0][0], enemies.heliS[0][1]);
		//console.log(enemies.heliS[0][1]);
		//enemies.drawExplosion3(150, 110);
		//enemies.drawExplosion2(50, 110);
		//enemies.drawExplosion1(100, 110);
	}


	player.draw();	
	level.drawFg();

	requestAnimationFrame(draw);
}

window.addEventListener("keydown", function (key) {

	//console.log(key.keyCode);
	
	if (player.transition != true) {
		if (key.keyCode == 37) {
			controlls.left = true;
			if (player.tiltCount > -50) {
				player.tiltCount -= 4;
			}
		}

		if (key.keyCode == 39) {
			controlls.right = true;
			if (player.tiltCount < 50) {
				player.tiltCount += 4;
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
			
			if (controlls.firing1 != true) {
				controlls.projectilePositionX1 = player.x;
				controlls.projectilePositionY1 = player.y;
				controlls.firing1 = true;
			}

			if (controlls.firing2 != true) {
				controlls.projectilePositionX2 = player.x;
				controlls.projectilePositionY2 = player.y;
				controlls.firing2 = true;
			}

			if (controlls.firing3 != true) {
				controlls.projectilePositionX3 = player.x;
				controlls.projectilePositionY3 = player.y;
				controlls.firing3 = true;
			}

			if (controlls.firing4 != true) {
				controlls.projectilePositionX4 = player.x;
				controlls.projectilePositionY4 = player.y;
				controlls.firing4 = true;
			}

			if (player.projectileCounter > 3) {
				player.projectileCounter = 0;
			}
		}

		if (key.keyCode == 83 && player.bombs > 0) {
			controlls.special = true;
		}

		if (key.keyCode == 51 && player.credits.join("") != "99") {
			player.credits[1] += 1;
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
	//console.log(controlls.fire);
	console.log(player.y)
}

window.onload = draw();