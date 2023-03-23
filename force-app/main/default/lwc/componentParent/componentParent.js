import { LightningElement } from 'lwc';

export default class ComponentParent extends LightningElement {

    guitarists = [
        {
            name: 'Mark Morton', metalRating: '4.8',
            image: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcS4-YNgaVBzoJS2Wj5Q91g3OAU-420xF6381UQdyVTjTg14rEP7Ers82hhUX4ACXyZu000R2xR2ELR3MPw',
        },
        {
            name: 'David Gilmour', metalRating: '1',
            image: 'https://www.rollingstone.com/wp-content/uploads/2019/01/david-gilmour-q-and-a.jpg',
        },
        {
            name: 'Carlos Santana', metalRating: '2',
            image: 'https://townsquare.media/site/295/files/2021/11/attachment-santana.jpg?w=980&q=75',
        },
        {
            name: 'Slash', metalRating: '3.5',
            image: 'https://www.vintageguitar.com/wp-content/uploads/SLASH_01-1.jpg',
        },
    ];

    chosenGuitarist;

    guitaristSelected(event) {
        this.chosenGuitarist = event.detail;

        let detailCopy = JSON.parse(JSON.stringify(event.detail));
        this.dispatchEvent(new CustomEvent('guitaristselected', { detail: detailCopy }));
    }
}