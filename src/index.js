import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class DrumPads extends Component {

    render() {
        const drumpads = this.props.bank;
        return (
            <div id="drum-machine-left">
                <div id="drum-pads">
                    {drumpads.map((drumpad, i) => {
                        return (
                            <div className="drum-pad" id={drumpad[1]} data-name={drumpad[1]} data-src={drumpad[1]} onClick={this.props.handleChange} key={i}>
                                <audio id={drumpad[0]} className="clip" src={`http://seanmurphy.eu/drum-machine/audio/${drumpad[1]}.wav`} type="audio/wav"></audio>
                                {drumpad[0]}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


class Controls extends Component {
    render() {
        return (
            <div id="drum-machine-right">
                <h1>Drum Machine 3000</h1>
                <div id="display">
                    {this.props.name}
                </div>
                <div id="volume-div">
                    <input id="volume" type="range" min="0" max="1" step="0.1" value={this.props.volume} onChange={this.props.changeVolume}/>
                    <span id="volume-display">{this.props.volume}</span>
                </div>
                <hr className="hr" width="70%"/>
                <div id="banks">
                    <div id="bank1" className="bank1 selected" onClick={this.props.changeBank}>
                        Bank 1
                    </div>
                    <div id="bank2" className="bank2" onClick={this.props.changeBank}>
                        Bank 2
                    </div>
                </div>
            </div>
        )
    }
}



class DrumMachine extends Component {
    constructor() {
        super();

        this.state = {
            clip: '',
            name: 'BANK 1',
            volume: 0.5,
            bank1: [['Q', 'clap'], ['W', 'snap'], ['E', 'rim'], ['A', 'hat1'], ['S', 'crash1'], ['D', 'crash2'], ['Z', 'snare1'], ['X', 'kick1'], ['C', 'tom1']],
            bank2: [['Q', 'clave'], ['W', 'triangle'], ['E', 'shaker'], ['A', 'stick'], ['S', 'hat2'], ['D', 'crash3'], ['Z', 'snare2'], ['X', 'kick2'], ['C', 'tom2']],
            defaultbank: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.changeBank = this.changeBank.bind(this);
    }



    componentWillMount() {
        this.setState({
            defaultbank: this.state.bank1
        })

        window.addEventListener('keydown', this.handleChange)
    }



    handleChange(event) {

        let file;
        let audio;

        // If its a Click Event
        if (event.type === 'click') {

            file = `http://seanmurphy.eu/drum-machine/audio/${event.target.dataset.src}.wav`;
            this.setState({
                name: event.target.dataset.name
            })
        }

        // If its a KeyDown Event
        else if (event.type === 'keydown') {

            let key = event.keyCode;
            let keyCodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];
            let keyFound = false;
            let i = ''

            for (let j in keyCodes) {
                if (key === keyCodes[j]) {keyFound = true; i = j;break;}
            }
            if (keyFound === false) return;

            file = `http://seanmurphy.eu/drum-machine/audio/${this.state.defaultbank[i][1]}.wav`;
            this.setState({
                name: this.state.defaultbank[i][1]
            }) 
        }

        audio = new Audio(file);
        audio.currentTime = 0;
        audio.volume = this.state.volume;
        audio.play();
    }



    changeVolume(event) {
        this.setState({
            volume: event.target.value
        })
    }



    changeBank(event) {
        const id = event.target.id;
        const bank1 = document.querySelector('#bank1');
        const bank2 = document.querySelector('#bank2');
        if (id === 'bank1') {
            bank1.classList.add('selected');
            bank2.classList.remove('selected');
            this.setState({
                defaultbank: this.state.bank1,
                name: 'BANK 1'
            })
        }
        else {
            bank2.classList.add('selected');
            bank1.classList.remove('selected');
            this.setState({
                defaultbank: this.state.bank2,
                name: 'BANK 2'
            })
        }
    }



    render() {
        return (
            <div id="drum-machine">
                <DrumPads handleChange={this.handleChange} bank={this.state.defaultbank}/>
                <Controls 
                    name={this.state.name}
                    volume={this.state.volume}
                    changeVolume={this.changeVolume}
                    changeBank={this.changeBank}
                />
            </div>
        )
    }
}
ReactDOM.render(<DrumMachine />, document.getElementById('root'));
