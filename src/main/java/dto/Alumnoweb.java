/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dto;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author USUARIO
 */
@Entity
@Table(name = "alumnoweb")
@NamedQueries({
    @NamedQuery(name = "Alumnoweb.findAll", query = "SELECT a FROM Alumnoweb a"),
    @NamedQuery(name = "Alumnoweb.findByCodiEstWeb", query = "SELECT a FROM Alumnoweb a WHERE a.codiEstWeb = :codiEstWeb"),
    @NamedQuery(name = "Alumnoweb.findByNdniEstdWeb", query = "SELECT a FROM Alumnoweb a WHERE a.ndniEstdWeb = :ndniEstdWeb"),
    @NamedQuery(name = "Alumnoweb.validar", query = "SELECT a FROM Alumnoweb a WHERE a.ndniEstdWeb = :ndniEstdWeb and a.passEstd = :passEstd"),
    @NamedQuery(name = "Alumnoweb.findByAppaEstWeb", query = "SELECT a FROM Alumnoweb a WHERE a.appaEstWeb = :appaEstWeb"),
    @NamedQuery(name = "Alumnoweb.findByApmaEstWeb", query = "SELECT a FROM Alumnoweb a WHERE a.apmaEstWeb = :apmaEstWeb"),
    @NamedQuery(name = "Alumnoweb.findByNombEstWeb", query = "SELECT a FROM Alumnoweb a WHERE a.nombEstWeb = :nombEstWeb"),
    @NamedQuery(name = "Alumnoweb.findByFechNaciEstdWeb", query = "SELECT a FROM Alumnoweb a WHERE a.fechNaciEstdWeb = :fechNaciEstdWeb"),
    @NamedQuery(name = "Alumnoweb.findByLogiEstd", query = "SELECT a FROM Alumnoweb a WHERE a.logiEstd = :logiEstd"),
    @NamedQuery(name = "Alumnoweb.findByPassEstd", query = "SELECT a FROM Alumnoweb a WHERE a.passEstd = :passEstd")})
public class Alumnoweb implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "codiEstWeb")
    private Integer codiEstWeb;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "ndniEstdWeb")
    private String ndniEstdWeb;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "appaEstWeb")
    private String appaEstWeb;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "apmaEstWeb")
    private String apmaEstWeb;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "nombEstWeb")
    private String nombEstWeb;
    @Basic(optional = false)
    @NotNull
    @Column(name = "fechNaciEstdWeb")
    @Temporal(TemporalType.DATE)
    private Date fechNaciEstdWeb;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "logiEstd")
    private String logiEstd;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "passEstd")
    private String passEstd;

    public Alumnoweb() {
    }

    public Alumnoweb(Integer codiEstWeb) {
        this.codiEstWeb = codiEstWeb;
    }

    public Alumnoweb(Integer codiEstWeb, String ndniEstdWeb, String appaEstWeb, String apmaEstWeb, String nombEstWeb, Date fechNaciEstdWeb, String logiEstd, String passEstd) {
        this.codiEstWeb = codiEstWeb;
        this.ndniEstdWeb = ndniEstdWeb;
        this.appaEstWeb = appaEstWeb;
        this.apmaEstWeb = apmaEstWeb;
        this.nombEstWeb = nombEstWeb;
        this.fechNaciEstdWeb = fechNaciEstdWeb;
        this.logiEstd = logiEstd;
        this.passEstd = passEstd;
    }

    public Integer getCodiEstWeb() {
        return codiEstWeb;
    }

    public void setCodiEstWeb(Integer codiEstWeb) {
        this.codiEstWeb = codiEstWeb;
    }

    public String getNdniEstdWeb() {
        return ndniEstdWeb;
    }

    public void setNdniEstdWeb(String ndniEstdWeb) {
        this.ndniEstdWeb = ndniEstdWeb;
    }

    public String getAppaEstWeb() {
        return appaEstWeb;
    }

    public void setAppaEstWeb(String appaEstWeb) {
        this.appaEstWeb = appaEstWeb;
    }

    public String getApmaEstWeb() {
        return apmaEstWeb;
    }

    public void setApmaEstWeb(String apmaEstWeb) {
        this.apmaEstWeb = apmaEstWeb;
    }

    public String getNombEstWeb() {
        return nombEstWeb;
    }

    public void setNombEstWeb(String nombEstWeb) {
        this.nombEstWeb = nombEstWeb;
    }

    public Date getFechNaciEstdWeb() {
        return fechNaciEstdWeb;
    }

    public void setFechNaciEstdWeb(Date fechNaciEstdWeb) {
        this.fechNaciEstdWeb = fechNaciEstdWeb;
    }

    public String getLogiEstd() {
        return logiEstd;
    }

    public void setLogiEstd(String logiEstd) {
        this.logiEstd = logiEstd;
    }

    public String getPassEstd() {
        return passEstd;
    }

    public void setPassEstd(String passEstd) {
        this.passEstd = passEstd;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (codiEstWeb != null ? codiEstWeb.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Alumnoweb)) {
            return false;
        }
        Alumnoweb other = (Alumnoweb) object;
        if ((this.codiEstWeb == null && other.codiEstWeb != null) || (this.codiEstWeb != null && !this.codiEstWeb.equals(other.codiEstWeb))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "dto.Alumnoweb[ codiEstWeb=" + codiEstWeb + " ]";
    }
    
}
