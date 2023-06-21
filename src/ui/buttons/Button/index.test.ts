import Button from ".";
import Sinon from "sinon";
import { expect } from "chai";

describe('Button', () => {

    const callback = Sinon.stub();

    const button = new Button({
        label: 'Проверка Label',
        events: { 
            click: callback
        }
    });

    describe('Element', () => {
        it('Должен быть элемент кнопки', () => {
            expect(button.element).to.be.instanceof(window.HTMLButtonElement);
        });

        it('Не должно быть элемента ввода', () => {
            expect(button.element).to.not.instanceof(window.HTMLInputElement);
        });
    })



    it('Shoud have be click', () => {
        button.element?.click();
        expect(callback.called).to.be.true;
    });
})
