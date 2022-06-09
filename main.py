def checkButtons():
    global PrePin1, PrePin2, PrePin3, PrePin4
    if pins.digital_read_pin(DigitalPin.P1) != PrePin1:
        PrePin1 = pins.digital_read_pin(DigitalPin.P1)
        if PrePin1 == 1:
            OnButtonClick(1)
    if pins.digital_read_pin(DigitalPin.P2) != PrePin2:
        PrePin2 = pins.digital_read_pin(DigitalPin.P2)
        if PrePin2 == 1:
            OnButtonClick(2)
    if pins.digital_read_pin(DigitalPin.P3) != PrePin3:
        PrePin3 = pins.digital_read_pin(DigitalPin.P3)
        if PrePin3 == 1:
            OnButtonClick(3)
    if pins.digital_read_pin(DigitalPin.P4) != PrePin4:
        PrePin4 = pins.digital_read_pin(DigitalPin.P4)
        if PrePin4 == 1:
            OnButtonClick(4)
def OnButtonClick(buttonId: number):
    OLED.write_num(buttonId)
PrePin4 = 0
PrePin3 = 0
PrePin2 = 0
PrePin1 = 0
OLED.init(128, 64)
basic.show_icon(IconNames.HEART)

def on_forever():
    checkButtons()
basic.forever(on_forever)

def on_in_background():
    pass
control.in_background(on_in_background)
