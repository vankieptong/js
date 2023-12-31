//
// Kim Lâu & Hoang Ốc
// Do Author: Harry Tran (Thiên Y) soạn
//

// Lấy Hoang Ốc Vị: 0-5
function hoangOcVi(t)
{
  var i=Math.floor(t/10);
  var h=0;
  if (i%2==1) h=(t+2)%6; // Odd: 10, 30, 50
  else h=(t+5)%6; // Even: 20, 40, 60
  return h;
}

// Hoang Ốc chưởng quyết; return 0: không bị, 1: bị
function laHoangOc(t)
{
  if (t<10) return 0; // không tính nhỏ hơn 10 tuổi
  var h=hoangOcVi(t);
  var o=0;
  switch(h)
  {
  case 2: case 4: case 5: o=1; break;
  default: break;
  }
  return o;
}

function hoangOc(t)
{
  var HoangOC = new Array("Cát", "Nghi", "Tam Sát", "Tấn Tài", "Thọ Tử", "Hoang Ốc");
  if (t<10) return ""; // không tính nhỏ hơn 10 tuổi
  var h=hoangOcVi(t);
  return HoangOC[h]; // Hoang Ốc cung
}

var T5=0; // Trung Ngũ, t5=1: 5, 15, 25, 35, 45, 50, 55, 65, 75, 85, 95. T5=0 chỉ dùng 5 và 50.

// Lấy Kim Lâu Vị: 0-7
function kimLauVi(t)
{
  var KL = [10,12,14,17,19,21,23,26,28,30,32,34,37,39,41,43,46,48,51,
	53,56,58,60,62,64,67,69,71,73,76,78,80,82,84,87,89,91,93,96,98];
  var k=0;
  if (T5) { // Trung Ngũ
    for (var i=0; i < KL.length; i++)
      if (KL[i] == t) break;
    if (i == KL.length) k = -1;
    else k = i % 4;
  }
  else {
    var i=Math.floor(t/10);
    if (i<5) k=(t+(7-i))%8;
    else k=(t+(6-i))%8; // vì từ 50 Nhập trung cung
  }
  return k;
}

// Kim Lâu chưởng quyết ?
function laKimLau(t)
{
  if (t<10) return 0; // không tính nhỏ hơn 10 tuổi
  var k=kimLauVi(t);
  var kl=0;
  if (T5)
    if (k > -1) kl=1;
  else
    if ((k%2)==0) kl=1; // Nếu số chẵn là Kim Lâu
  return kl;
}

function kimLau(t)
{
  // 8 tuổi: Tân Mùi, Tân Sửu, Nhâm Thân, Nhâm Dần, Kỷ Sửu, Kỷ Mùi, Canh Thân, Canh Dần lại không bị Kim Lâu 
  var KIMLAU = new Array("Thân","Thê","Tử","Súc");
  if (t<10) return ""; // không tính nhỏ hơn 10 tuổi
  var k=kimLauVi(t);
  if (T5) {
    if (k > -1)
      return KIMLAU[k];
  }
  else {
    var i=k;
    if ((k%2)==0) // Nếu số chẵn là Kim Lâu
    {
      if (i) i=i/2; // Kim Lâu cung
      return KIMLAU[i];
    }
  }
  return "";
}

// 8 tuổi: Tân Mùi, Tân Sửu, Nhâm Thân, Nhâm Dần, Kỷ Sửu, Kỷ Mùi, Canh Thân, Canh Dần
// không bị Kim Lâu. Đặc miễn Kim Lâu
function phiKimLau(canvi, chivi)
{
  var m = 0;

  switch(canvi) {
  case 5: // Kỷ
  case 7: // Tân
    if (chivi == 1 || chivi == 7) m = 1; break; // Sửu or Mùi
  case 6: // Canh
  case 8: // Nhâm
    if (chivi == 2 || chivi == 8) m = 1; break; // Dần or Thân
  }

  return m;
}

// 8 tuổi: Tân Mùi, Tân Sửu, Nhâm Thân, Nhâm Dần, Kỷ Sửu, Kỷ Mùi, Canh Thân, Canh Dần
// không bị Kim Lâu. Đặc miễn Kim Lâu
function mienKimLau(can, chi)
{
  var canvi = canVi(can);
  var chivi = chiVi(chi);
  return phiKimLau(canvi, chivi);
}

// Hạn Tam Tai; return 3 Tai [Đầu, Giữa, Cuối]
function han3Tai(chi)
{
  var c=chiVi(chi);
  var tt;
  // Tam hợp: Thân Tý Thìn, Dần Ngọ Tuất, Tỵ Dậu Sửu, Hợi Mão Mùi
  // 0 Tý    1 Sửu  2 Dần  3 Mão  4 Thìn 5 Tỵ   6 Ngọ  7 Mùi  8 Thân 9 Dậu  A Tuất B Hợi
  // "Thủy", "Thổ", "Mộc", "Mộc", "Thổ", "Hỏa", "Hỏa", "Thổ", "Kim", "Kim", "Thổ", "Thủy"
  // Lấy chi thuộc "Thổ" trong mỗi cục Tam Hợp, và 2 chi liền trước đó là Tam Tai
  switch(chi)
  {
	// Thân, Tý, Thìn 3 tai đầu Dần, giữa Mão, cuối Thìn
  case 0: case 4: case 8: tt = [2,3,4]; break;
	// Tỵ, Dậu, Sửu 3 tai đầu Hợi, giữa Tý, cuối Sửu
  case 1: case 5: case 9: tt = [11,0,1]; break;
	// Dần , Ngọ, Tuất 3 tai đầu Thân, giữa Dậu, cuối Tuất
  case 2: case 6: case 10: tt = [8,9,10]; break;
	// Hợi, Mão, Mùi 3 tai đầu Tỵ, giữa Ngọ, cuối Mùi
  case 3: case 7: case 11: tt = [5,6,7]; break;
  }
  return tt;
}

