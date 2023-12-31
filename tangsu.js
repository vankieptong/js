//
// Trùng Nhật & Trùng Tang
// Author: Harry Tran (a.k.a Thiên Y) in USA (email: thien.y@operamail.com)
//


/* Trùng Tang hay không ?
	Cách giải: dùng giấy vàng viết 4 chữ đỏ: "XXXX", để vào phong thơ trắng và bỏ
	lên nắp quan tài đem đi chôn luôn.
	Tháng 12,1,2,6,9: Lục Canh Thiên Hình,
	Tháng  3: Lục Tân Thiên Diên,
	Tháng  4: Lục Nhâm Thiên Tai,
	Tháng  5: Lục Quí Thiên Ngục,
	Tháng  7: Lục Giáp Thiên Phúc,
	Tháng  8: Lục Ất Thiên Đức,
	Tháng 10: Lục Bính Thiên Oai,
	Tháng 11: Lục Tý Thiên Âm.
*/
function trungTang(t)
{
  var tt=0; // Trùng Tang
  switch(t)
  {
  case  2: // Dần
  case  5: // Tỵ
  case  8: // Thân
  case 11: // Hợi
    tt = t; break;
  default: break;
  }
  return tt;
}

// Xem Ngày Trùng Tang (Trùng Nhật) cho Nam vong nhân
//	mm: 1-12; dd: 1-29,30; hh: 1-12
function namTrungNhat(t, mm, dd, hh)
{
  var tn=0; // Trùng Nhật
  if (t<10) return tn;

  /*	Nam 10 tuổi khởi tại Dần, đếm thuận hết số hàng chục, tiếp số lẻ tới đủ tuổi người mất,
	rồi từ đó đếm tháng Giêng tới tháng mất, lại từ đó đếm mồng 1 tới ngày mất (xem có phạm
	Trùng Nhật hay không? Nếu không xem tiếp), rồi từ đó đếm giờ Tý tới giờ mất.
	Nếu nhằm cung Dần, Thân, Tị, Hợi là phạm nhằm.
  */
  var k = Math.floor(t/10);
  var i = (t+1) + k*3 + (mm-1) + (dd-1); // + (hh-1);
  i = i%12;
  if (tn=trungTang(i)) // Trùng Nhật
    return tn;
  i = (t+1) + k*3 + (mm-1) + (dd-1) + (hh-1);
  i = i%12;
  return trungTang(i); // Trùng Thời (giờ)
}

// Xem Ngày Trùng Tang (Trùng Nhật) cho Nữ vong nhân
//	mm: 1-12; dd: 1-29,30; hh: 1-12
function nuTrungNhat(t, mm, dd, hh)
{
  var tn=0; // Trùng Nhật
  if (t<10) return tn;

  /*	Nữ thì 10 tuổi khởi từ cung Thân đếm nghịch chiều hết số hàng chục, tiếp số lẻ tới đủ tuổi
	người mất, rồi từ đó đếm tháng Giêng tới tháng mất, lại từ đó đếm mồng 1 tới ngày mất (xem có phạm
	Trùng Nhật hay không? Nếu không xem tiếp), rồi từ đó đếm giờ Tý tới giờ mất.
	Nếu nhằm cung Dần, Thân, Tị, Hợi là phạm nhằm.
  */
  var k = Math.floor(t/10);
  var i = (k*10+(k-3))%12;
  var j = i - (t%10);
  if (j < 0) j += 12;
  var x = ((mm-1) + (dd-1))%12;
  var n = j - x;
  if (n < 0) n += 12;
  if (tn=trungTang(n)) // Trùng Nhật
    return tn;
  x = ((mm-1) + (dd-1) + (hh-1))%12;
  n = j - x;
  if (n < 0) n += 12;
  return trungTang(n); // Trùng Thời (giờ)
}


