module.exports = [
    {
        type: 'input',
        name: 'name',
        message: "What's your component name?"
    },
    {
        type: 'confirm',
        name: 'style',
        message: 'Do you want a style file?'
    },
    {
        type: 'autocomplete',
        name: 'category',
        message: "What's your component category?",
        limit: 1,
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page']
    }
]
