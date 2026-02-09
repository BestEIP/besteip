jQuery(function ($) {
    $('.easy-pie-chart.percentage').each(function () {
        var $box = $(this).closest('.infobox');
        var size = 60;/*parseInt($(this).data('size')) || 50;*/
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var perce = $(this).attr('data-percent');
		if (perce <= 25) {//綠
            barColor = '#4FD072';
            trackColor = '#CAF0C7';
        }
        else if (perce > 25 && perce <= 50) {//黃
            barColor = '#FFD837';
            trackColor = '#FFF2CD';
        }
        else if (perce > 50 && perce <= 75) {//橘
            barColor = '#FF9666';
            trackColor = '#FFE1D2';
        }
        else {//紅
            barColor = '#FF6464';
            trackColor = '#FFD9D9';
        }
        $(this).easyPieChart({
            barColor: barColor,//進度圈顏色
            trackColor: trackColor,//底圈顏色
            scaleColor: false,//刻度顏色
            lineCap: 'butt',//進度圈角平角 square round butt
            lineWidth: parseInt(size / 10) + 1,//線粗
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,//載入進度速度
            size: size//大小
        });
    })

    /*反向*/
    $('.easy-pie-chart.percentagec').each(function () {
        var $box = $(this).closest('.infobox');
        var size = 60;/*parseInt($(this).data('size')) || 50;*/
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var perce = $(this).attr('data-percent');
        if (perce <= 25) {//紅
            barColor = '#FF6464';
            trackColor = '#FFD9D9';
        }
        else if (perce > 25 && perce <= 50) {//橘
            barColor = '#FF9666';
            trackColor = '#FFE1D2';
        }
        else if (perce > 50 && perce <= 75) {//黃
            barColor = '#FFD837';
            trackColor = '#FFF2CD';
        }
        else {//綠
            barColor = '#4FD072';
            trackColor = '#CAF0C7';
        }
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10) + 1,
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
            size: size
        });
    })

    $('.sparkline').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
        $(this).sparkline('html',
                         {
                             tagValuesAttribute: 'data-values',
                             type: 'bar',
                             barColor: barColor,
                             chartRangeMin: $(this).data('min') || 0
                         });
    });
})