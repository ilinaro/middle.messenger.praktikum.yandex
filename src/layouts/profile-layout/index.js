import Handlebars from 'handlebars/dist/handlebars.runtime';
import Layouts from 'handlebars-layouts';
import ProfileLayout from './profile-layout.hbs';

Handlebars.registerPartial('ProfileLayout', ProfileLayout);
Handlebars.registerHelper(Layouts(Handlebars));
