/**
 * Created by adjohnso on 2/1/2016.
 */


var React = require('react');
var Accordion = require('react-foundation-apps/src/accordion');

var SampleAccordion = React.createClass({
    render: function () {
        return (
            <Accordion>
            <Accordion.Item title='First item title'>
            First item content
        </Accordion.Item>
        <Accordion.Item title='Second item title'>
            Second item content
        </Accordion.Item>
        <Accordion.Item title='Third item title'>
            Third item content
        </Accordion.Item>
        </Accordion>
        );
    }
});

module.exports = SampleAccordion;