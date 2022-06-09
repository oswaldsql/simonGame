function checkButtons () {
    CheckButton(pins.digitalReadPin(DigitalPin.P1), 1)
    CheckButton(pins.digitalReadPin(DigitalPin.P2), 2)
    CheckButton(pins.digitalReadPin(DigitalPin.P3), 3)
    CheckButton(pins.digitalReadPin(DigitalPin.P4), 4)
}
function SimonsTur () {
    for (let value of Bane) {
        ShowColor(value)
    }
    list = []
    basic.showIcon(IconNames.Happy)
}
function OnButtonClick (buttonId: number) {
    list.push(buttonId)
}
function SpillersTur () {
    debug()
    current = 0
    for (let Trind of Bane) {
        while (list.length == 0) {
            basic.pause(50)
        }
        KnapTryk = list.shift()
        OLED.writeNum(KnapTryk)
        OLED.writeString("->")
        OLED.writeNum(Trind)
        if (KnapTryk != Trind) {
            NæsteNiveau = 0
            return
        }
        current += 1
        VisScore()
        ShowColor(KnapTryk)
    }
    NæsteNiveau = 1
    return
}
function VentPåStart () {
    while (!(input.buttonIsPressed(Button.A))) {
        basic.showIcon(IconNames.Square)
        basic.pause(50)
    }
    NæsteNiveau = 1
}
function VisScore () {
    radio.sendValue("score", Bane.length)
    radio.sendValue("current", current)
    radio.sendValue("h", HighScore)
}
function ShowColor (button: number) {
    if (button == 1) {
        shw(RedRing, NeoPixelColors.Red)
    }
    if (button == 2) {
        shw(YellowRing, NeoPixelColors.Yellow)
    }
    if (button == 3) {
        shw(GreenRing, NeoPixelColors.Green)
    }
    if (button == 4) {
        shw(BlueRing, NeoPixelColors.Blue)
    }
}
function SetHighScore () {
    if (Bane.length > HighScore) {
        HighScore = Bane.length
    }
}
function CheckButton (state: number, index: number) {
    if (state != preButtonValue[index]) {
        preButtonValue[index] = state
        if (state == 1) {
            OnButtonClick(index)
        }
    }
}
function LavNyBane () {
    Bane = []
}
function debug () {
    OLED.clear()
    OLED.writeString("bane ")
    for (let value2 of Bane) {
        OLED.writeNum(value2)
    }
    OLED.newLine()
    OLED.writeString("svar ")
    for (let value3 of list) {
        OLED.writeNum(value3)
    }
    OLED.newLine()
    OLED.writeString("score ")
    OLED.writeNum(Bane.length)
    OLED.newLine()
    OLED.writeString("hscore ")
    OLED.writeNum(HighScore)
    OLED.newLine()
    OLED.writeString("KnapTryk ")
    OLED.writeNum(KnapTryk)
    OLED.newLine()
}
function TilføjNiveau () {
    Bane.push(randint(1, 4))
    debug()
}
input.onButtonPressed(Button.B, function () {
    shw(YellowRing, NeoPixelColors.Yellow)
})
function GameOver () {
    radio.sendValue("d", 0)
    RedRing.showColor(neopixel.colors(NeoPixelColors.Red))
    YellowRing.showColor(neopixel.colors(NeoPixelColors.Red))
    GreenRing.showColor(neopixel.colors(NeoPixelColors.Red))
    BlueRing.showColor(neopixel.colors(NeoPixelColors.Red))
    RedRing.show()
    YellowRing.show()
    GreenRing.show()
    BlueRing.show()
    basic.pause(2000)
    RedRing.clear()
    GreenRing.clear()
    YellowRing.clear()
    BlueRing.clear()
    RedRing.show()
    YellowRing.show()
    GreenRing.show()
    BlueRing.show()
}
let HighScore = 0
let NæsteNiveau = 0
let KnapTryk = 0
let current = 0
let Bane: number[] = []
let list: number[] = []
let preButtonValue: number[] = []
let BlueRing: neopixel.Strip = null
let YellowRing: neopixel.Strip = null
let GreenRing: neopixel.Strip = null
let RedRing: neopixel.Strip = null
function shw(st: neopixel.Strip, color : NeoPixelColors ) {
    st.showColor(color)
    st.show()
    basic.pause(500)
    st.clear()
    st.show()
    basic.pause(100)
}
radio.setGroup(128)
preButtonValue = [
0,
0,
0,
0
]
list = []
OLED.init(128, 64)
RedRing = neopixel.create(DigitalPin.P13, 12, NeoPixelMode.RGB)
GreenRing = neopixel.create(DigitalPin.P14, 12, NeoPixelMode.RGB)
YellowRing = neopixel.create(DigitalPin.P15, 12, NeoPixelMode.RGB)
BlueRing = neopixel.create(DigitalPin.P16, 12, NeoPixelMode.RGB)
basic.showIcon(IconNames.Heart)
LavNyBane()
basic.forever(function () {
    VentPåStart()
    LavNyBane()
    while (NæsteNiveau == 1) {
        TilføjNiveau()
        SimonsTur()
        SpillersTur()
        SetHighScore()
    }
    VisScore()
    GameOver()
})
control.inBackground(function () {
    while (true) {
        checkButtons()
        basic.pause(25)
    }
})
