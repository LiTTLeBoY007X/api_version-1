$(document).ready(() => {
    $('#FormContent').change(() => {
        var content = $("#FormContent").val()
        var now = new Date();
        var formattedDate = now.toLocaleString();
        if (content.length > 0) {
            $("#Contentshow").text(content)
            $('.dispalyshowPost').css('display', 'block')
            $('#timePostPreview').html(formattedDate)
        }
        else {
            $('.dispalyshowPost').css('display', 'none')
        }
    })
    $('#formFileMultiple').change(() => {
        $('#Template').empty()
        $('#imagePreview').empty()
        var fileLength = $('#formFileMultiple')[0].files; // เลือกรูปภาพที่ผู้ใช้เลือก
        var imageUrl = []
        if (fileLength.length > 0) {
            $('.Pictureshowdisplay').css('display', 'block')
            if (fileLength.length == 3) {
                $('#Template').append("<select id=temselect class=form-select name=val aria-label=Default select example><option value=0>เลือกรูปแบบ</option> <option id=#tem value=Tem_3_1>Template 1 <option id=#tem value=Tem_3_2>Template 2</option>")
                $('#temselect').change(() => {
                    var tem = $('#temselect').val()
                    if (tem == 0) {
                        $('#imagePreview').empty()
                        $('.Pictureshowdisplay').css('display', 'none')
                    }
                    if (tem == 'Tem_3_1') {
                        $('#imagePreview').empty()
                        $('.Pictureshowdisplay').css('display', 'block')
                        $('.dispalyshowPost').css('display', 'block')
                        for (let i = 0; i < fileLength.length; i++) {
                            var file = $('#formFileMultiple')[0].files[i];
                            imageUrl.push(URL.createObjectURL(file)); // สร้าง URL จากไฟล์รูปภาพ
                        }
                        $('#imagePreview').append(`<div class="Tem_1_pic_3"><img class="tem_1_pic3_poi_1" src="${imageUrl[0]}" alt="Preview"><img class="tem_1_pic3_poi_2" src="${imageUrl[1]}" alt="Preview"><img class="tem_1_pic3_poi_3" src="${imageUrl[2]}" alt="Preview">`);


                    }
                    if (tem == 'Tem_3_2') {
                        $('#imagePreview').empty()
                        $('.Pictureshowdisplay').css('display', 'block')
                        $('.dispalyshowPost').css('display', 'block')
                        for (let i = 0; i < fileLength.length; i++) {
                            var file = $('#formFileMultiple')[0].files[i];
                            imageUrl.push(URL.createObjectURL(file)); // สร้าง URL จากไฟล์รูปภาพ
                        }
                        $('#imagePreview').append(`<div class="Tem_2_pic_3"><img class="tem_2_pic3_poi_3 " src="${imageUrl[0]}" alt="Preview"><img class="tem_2_pic3_poi_1" src="${imageUrl[1]}" alt="Preview"><img class="tem_2_pic3_poi_2" src="${imageUrl[2]}" alt="Preview">`);


                    }
                })

            }
            if (fileLength.length == 4) {
                $('#Template').append("<select id=temselect class=form-select name=val aria-label=Default select example><option id=#tem value=Tem_4_1>Template 1")
                $('.Pictureshowdisplay').css('display', 'block')
                $('#imagePreview').empty()
                $('.dispalyshowPost').css('display', 'block')
                for (let i = 0; i < fileLength.length; i++) {
                    var file = $('#formFileMultiple')[0].files[i];
                    imageUrl.push(URL.createObjectURL(file)); // สร้าง URL จากไฟล์รูปภาพ
                }
                $('#imagePreview').append(`<div class="Tem_1_pic_4"><img class="tem_1_pic4_poi_1 " src="${imageUrl[0]}" alt="Preview"><img class="tem_1_pic4_poi_2" src="${imageUrl[1]}" alt="Preview"><img class="tem_1_pic4_poi_3" src="${imageUrl[2]}" alt="Preview"><img class="tem_1_pic4_poi_4" src="${imageUrl[3]}" alt="Preview">`);
            }
            if (fileLength.length <= 2) {
                $('.Pictureshowdisplay').css('display', 'block')
                $('#imagePreview').empty()
                for (let i = 0; i < fileLength.length; i++) {
                    $('.dispalyshowPost').css('display', 'block')
                    var file = $('#formFileMultiple')[0].files[i]
                    imageUrl.push(URL.createObjectURL(file));
                    $('#imagePreview').append(`<img class="max-width" src="${imageUrl[i]}" alt="Preview">`);


                }
            }
        }
        else {
            $('.Pictureshowdisplay').css('display', 'none')
        }
    })
})