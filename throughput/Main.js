
function main() {
    let r1 = document.getElementById("r1").value.replaceAll(",",".").split(" ")
    let r2 = document.getElementById("r2").value.replaceAll(",",".").split(" ")
    let msg = `Пусть p(x0)=a, тогда p(x1)=1-a`
    msg += "<br>"
    let p00, p01, p10, p11
    let a,b,c,d
    a = p00 = Number(r1[0])
    b = p01 = Number(r2[0])
    c = p10 = Number(r1[1])
    d = p11 = Number(r2[1])
    let m = parseFloat(Number((a-b)).toFixed(6))
    let k0 = parseFloat((-a*Math.log(a)-c*Math.log(c)).toFixed(5))
    let k1 = parseFloat((-b*Math.log(b)-d*Math.log(d)).toFixed(5))
    let k = parseFloat((k0-k1).toFixed(5))
    let k2m = parseFloat((k/m).toFixed(5))
    let dpb = parseFloat((d+b).toFixed(5))
    let alpha = 1/m*(dpb/(Math.exp(k2m) + 1) - b)
    alpha = parseFloat(alpha.toFixed(5))
    msg += `Из матрицы находим условные вероятности 
    p(y0|x0)=${p00}, p(y1|x0)=${p10}
    p(y0|x1)=${p01}, p(y1|x1)=${p11}`
    msg += "<br>"
    msg += `Найдем выходные вероятности по формуле полной вероятности: <br>`
    msg += `p(y0)= ${a}*a+${b}*(1-a)= ${m}a+${b} <br>`
    msg += `p(y1)= ${c}*a+${d}*(1-a)= ${-m}a+${d} <br>`
    msg += `<br>`
    msg += `Найдем энтропию H(Y) <br>`
    msg += `H(y)=-( (${m}a+${b})log(${m}a+${b}) + (${-m}a+${d})log(${-m}a+${d})) <br>`
    msg += `Найдем энтропию H(Y|X)  <br>`
    msg += `H(Y|x0)=-${a}log(${a})-${c}log(${c}) = ${k0} <br>`
    msg += `H(Y|x1)=-${b}log(${b})-${d}log(${d}) = ${k1} <br>`
    msg += `H(Y|X)=a*${k0}+(1-a)*${k1} = ${k}*a+${k1} <br>`
    msg += `Найдем взаимную информацию I(Y,X) = H(Y)-H(Y|X)  <br>`
    msg += `I(Y,X)= -( (${m}a+${b})log(${m}a+${b}) + (${-m}a+${d})log(${-m}a+${d})) - (${k}*a+${k1}) <br>`
    msg += `Найдем dI(Y,X)/da  <br>`
    msg += `dI(Y,X)/da= 
    -( (${m}a+${b})'*log(${m}a+${b})+(${m}a+${b})*(log(${m}a+${b}))' 
    + (${-m}a+${d})'log(${-m}a+${d})+(${-m}a+${d})*(log(${-m}a+${d}))' ) + (${-k}) = <br>`
    msg += `= -( ${m}*log(${m}a+${b})+(${m})+ ${-m}*log(${-m}a+${d})+(${-m}) ) + (${-k}) = <br>`
    msg += `= ${-m}*log(${m}a+${b}) + (${m})*log(${-m}a+${d}) + (${-k})  <br>`
    msg += `Решим dI(Y,X)/da = 0 относительно а <br>`
    msg += `${-m}*log(${m}a+${b}) + (${m})*log(${-m}a+${d}) + (${-k}) = 0<br>`
    msg += `${m}(log(${-m}a+${d})-log(${m}a+${b}) = (${k}) <br>`
    msg += `log[(${-m}a+${d})/(${m}a+${b})] = (${k2m}) <br>`
    msg += `log[-(${m}a-${d})/(${m}a+${b})] = (${k2m}) <br>`
    msg += `log[-(${m}a+${b}-${b}-${d} )/(${m}a+${b})] = (${k2m}) <br>`
    msg += `log[-(1 - ${dpb}/(${m}a+${b}))] = (${k2m}) <br>`
    msg += `log[${dpb}/(${m}a+${b}) - 1] = (${k2m}) <br>`
    msg += `Возведем обе части уравнения на экспоненту(идите нахуй я не силен в русском) <br>`
    msg += `${dpb}/(${m}a+${b}) - 1 = e^(${k2m}) <br>`
    msg += `${dpb}/(${m}a+${b}) = e^(${k2m}) + 1 <br>`
    msg += `(${m}a+${b}) = ${dpb}/(e^(${k2m}) + 1) <br>`
    msg += `a = 1/${m}*(${dpb}/(e^(${k2m}) + 1) - ${b}) <br>`
    msg += `a = ${alpha} <br>`
    msg += `Подставим "а" в I(X,Y) для того чтобы найти Imax(X,Y) ~ пропускной способности <br>`
    msg += `Imax(Y,X)= -( (${m}*${alpha}+${b})log(${m}*${alpha}+${b}) + 
    (${-m}*${alpha}+${d})log(${-m}*${alpha}+${d})) - (${k}*${alpha}+${k1}) <br>`
    msg += `Imax(Y,X)= -( (${parseFloat(m*alpha+b).toFixed(5)})*log(${parseFloat(m*alpha+b).toFixed(5)}) + 
    (${parseFloat(-m*alpha+d).toFixed(5)})*log(${parseFloat(-m*alpha+d).toFixed(5)})) 
    - (${parseFloat(k*alpha+k1).toFixed(5)}) <br>`
    msg += `Imax(Y,X)=
    ${parseFloat((-(m*alpha+b)*Math.log(m*alpha+b)-(-m*alpha+d)*Math.log(-m*alpha+d)+k*alpha+k1).toFixed(5))}
    <br>`

    const out = document.getElementById("out")
    out.innerHTML = msg
}

