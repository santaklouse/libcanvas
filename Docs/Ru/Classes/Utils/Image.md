LibCanvas.Utils.Image
=====================

Расширение прототипа Image

## Динамические методы

#### toCanvas
сделать canvas из картинки

	var canvas = img.toCanvas();

#### sprite(rectangle)
Вырезать спрайт из картинки размером с `rectangle`. Если выходит за пределы - картинка продублируется словно паттерн.
Все спрайты кешируются - при огромном количестве использования данной функции с разными аргументами может течь память, используйте `createSprite` для некеширующего вырезания.

	var sprite = img.sprite( new Rectangle(0, 0, 15, 15) );
	var sprite = img.sprite( 0, 0, 15, 15 );

