import Handlebars from 'handlebars/dist/handlebars.runtime'
import Layouts from 'handlebars-layouts'
import PrimaryLayout from './primary-layout.hbs'

Handlebars.registerPartial('PrimaryLayout', PrimaryLayout)
Handlebars.registerHelper(Layouts(Handlebars))
