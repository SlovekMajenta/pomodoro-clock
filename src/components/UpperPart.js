import React from 'react';

//Could be more readable with many components but I missed that while was coding))


export default class UpperPart extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            breakL: 5,
            breakMinutes: 5,
            sessionMinutes: 25,
            sessionL: 25,
            playOn: false,
            pauseOn: true,
            sMinutes: 25,
            sSeconds: 0,
            timer: 0,
            break:'Break',
            session:'Session',
            audio: new Audio('https://www.tones7.com/media/hallelujah.mp3'),

            def:{
                breakL: 5,
                sessionL: 25,
                playOn: false,
                pauseOn: true,
                sMinutes: 25,
                sSeconds: 0,
                timer: 0,
                break:'Break',
                session:'Session',

            }
        }

        this.incBL = this.incBL.bind(this);
        this.decBL = this.decBL.bind(this);
        this.incSL = this.incSL.bind(this);
        this.decSL = this.decSL.bind(this);
        this.toDef = this.toDef.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this)
    }


    incBL(){
        if(this.state.breakL < 60 && this.state.pauseOn){
            this.setState({breakL: this.state.breakL + 1, breakMinutes: this.state.breakL + 1})
        }
    }

    decBL(){
        if(this.state.breakL > 1 && this.state.pauseOn){
            this.setState({breakL: this.state.breakL - 1, breakMinutes: this.state.breakL - 1})
        }
    }

    incSL(){
        if(this.state.sessionL < 60 && this.state.pauseOn){
            this.setState({sessionL: this.state.sessionL + 1, sMinutes: this.state.sessionL + 1, sessionMinutes: this.state.sessionL + 1})
        }
    }

    decSL(){
        if(this.state.sessionL > 1 && this.state.pauseOn){
            this.setState({sessionL: this.state.sessionL - 1, sMinutes: this.state.sessionL - 1, sessionMinutes: this.state.sessionL - 1})
        }
    }

    toDef(){
        this.state.audio.volume=0;
        this.setState(
            {
                breakL: this.state.def.breakL,
                sessionL: this.state.def.sessionL,
                playOn: this.state.def.playOn,
                pauseOn: this.state.def.pauseOn,
                sMinutes: this.state.def.sMinutes,
                sSeconds: this.state.def.sSeconds,
                timer: clearInterval(this.state.timer),
                break: this.state.def.break,
                session: this.state.def.session,
            }
        )
    }

    play(){
        let j = new Date();
        j.setMinutes(j.getMinutes() + this.state.sMinutes);
        j.setSeconds(j.getSeconds() + this.state.sSeconds);
        let temp = new Date();

        this.setState({playOn: true, pauseOn: false, timer: setInterval(()=>{
            let res = new Date(j - temp);
            temp = new Date();

            if(this.state.sMinutes == 0 && this.state.sSeconds == 0){
                this.state.audio.play();
                this.state.audio.volume=0.2;
                this.setState({
                    timer: clearInterval(this.state.timer), 
                    session:this.state.break, 
                    break: this.state.session,
                    breakMinutes: this.state.sessionMinutes,
                    sessionMinutes: this.state.breakMinutes,
                    sMinutes: this.state.breakMinutes
                });
                console.log("breakMinutes: ", this.state.breakMinutes, "sessionMinutes: ", this.state.sessionMinutes,"sMinutes: ", this.state.sMinutes)
                this.play();
                return 0;
            }

            this.setState({sMinutes: res.getMinutes(), sSeconds: res.getSeconds()});

        }, 100)})
    }

    pause(){
        this.state.audio.volume=0;
        this.setState({playOn: false, pauseOn: true, timer: clearInterval(this.state.timer)})
    }


    render(){

        return (
        <section id="upper-part">
            <h1>Pomodoro Cluck</h1>
            <section id="length-buttons">
                <div>
                    <h2>Break Length</h2>
                    <h2 className="h23">
                        <i className="fas fa-arrow-up" onClick={this.incBL}></i>
                        {this.state.breakL}
                        <i className="fas fa-arrow-down" onClick={this.decBL}></i>
                    </h2>
                </div>
                <div>
                    <h2>Session Length</h2>
                    <h2 className="h23">
                        <i className="fas fa-arrow-up"  onClick={this.incSL}></i>
                        {this.state.sessionL}
                        <i className="fas fa-arrow-down" onClick={this.decSL}></i>
                    </h2>
                </div>
            </section>
            <section id='session'>
                    <h2>{this.state.session}</h2>
                    <h2 id="time">{this.state.sMinutes}:{this.state.sSeconds}</h2>
            </section>
            <section id="play-buttons">
                {this.state.playOn == true ?
                <i className="fas fa-play"></i>:
                <i className="fas fa-play" onClick={this.play}></i>}
                
                <i className="fas fa-pause" onClick={this.pause}></i>
                <i className="fas fa-sync-alt" onClick={this.toDef}></i>
            </section>
            <footer><a href="tg://resolve?domain=steveblowjobs666">Slava Merkulov Production</a></footer>
        </section>
        );
    }
}