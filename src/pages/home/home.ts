import { Component, ViewChild } from '@angular/core';

import { NavController, Slides, ToastController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {   
    currentHourIndex: number = 0;
    currentMinutesIndex: number = 0;
    currentAmPmIndex: number = 0;

    sliderHourList = [];
    sliderMinuteList = [];
    sliderAMPMList = [{ item: '' }, { item: 'AM' }, { item: 'PM' }, { item: '' }];

    mySlideOptions1 = {
        initialSlide: 0,
        direction: 'vertical',
        loop: false,
        speed: 300,
        freeMode: true,
        freeModeSticky: true,
        slidesPerView: 3,
        spaceBetween: 60,
        effect: 'coverflow',
        coverflow: {
            rotate: -5,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false
        }
    };

    @ViewChild('mySlider1') slider1: Slides;
    @ViewChild('mySlider2') slider2: Slides;
    @ViewChild('mySlider3') slider3: Slides;

    constructor(public navCtrl: NavController,
        public toastCtrl: ToastController, 
        public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        for (var i = 0; i <= 13; i++) {
            if (i == 0 || i == 13) {
                this.sliderHourList.push({ item: '' });
            } else {
                this.sliderHourList.push({ item: this.setTime(i) });
            }
        }
        for (var i = -1; i <= 60; i++) {
            if (i == -1 || i == 60) {
                this.sliderMinuteList.push({ item: '' });
            } else {
                this.sliderMinuteList.push({ item: this.setTime(i) });
            }

        }
    }
   
    getTimeClicked() {
        var hour = (this.slider1.getActiveIndex() + 1);
        var minute = (this.slider2.getActiveIndex() + 1);
        var ampm = (this.slider3.getActiveIndex() + 1);

        var selectedTiime = this.getValue(hour, this.sliderHourList) + ':' +
            this.getValue(minute, this.sliderMinuteList) + ' ' +
            this.getValue(ampm, this.sliderAMPMList);

        this.presentToast(selectedTiime);
        this.presentAlert(selectedTiime);
    }

    private getValue(index, array) {
        var result: string;
        if (array.length == 14) {
            result = index == 13 ? '12' : array[index].item;
        } else {
            result = array[index].item;
        }
        return result;
    }

    private setTime(num: number) {
        var result: string;
        return result = num < 10 ? '0' + num.toString() : num.toString();
    }

    private presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 1500,
            position: 'top'
        });
        toast.present();
    }

    private presentAlert(msg) {
        let alert = this.alertCtrl.create({
            message: msg
        });
        alert.present();
    }
}
